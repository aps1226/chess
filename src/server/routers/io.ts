import express, { Application, RequestHandler } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import jwt, { VerifyErrors} from 'jsonwebtoken';

import gamesController from '../controllers/gamesController';

type NumClients = number;

interface WaitingClients {
    [k:NumClients]: string | null;
}

module.exports = (server:http.Server, app:Application) =>{

    const io = new Server(server);

    const accessTokenSecret = String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_ACCESS_TOKEN_SECRET'] : process.env['DEV_ACCESS_TOKEN_SECRET'] );

    // Middleware
    // Authenticate new connection.
    io.use((socket,next) =>{
        const {token} = socket.handshake.auth;
        return jwt.verify(token, accessTokenSecret, (err: VerifyErrors | null) =>{
            if(err) return next( new Error('JWT is invalid.'));
            return next();
        })
    })

    const db = app.locals['db'];

    let numClients:NumClients = 0;
    const waitingClients:WaitingClients = {
        1: null,
        2: null,
    };
    // Create a game room for matched players.
    const createGame  = async () =>{
        const users = Object.values(waitingClients);
        const newGame = await gamesController.newGame(db,users[0],users[1]);
        const gameID = newGame['gameID'].toString();
        const connectedSockets = await io.in('waitingRoom').fetchSockets();
        connectedSockets.forEach((socket) =>{
            socket.join(gameID);
            socket.leave('waitingRoom');
        });
        io.to(gameID).emit('gameData',newGame);
        console.log(`Users ${users[0]} and ${users[1]} have joined a game together.`);
        console.log(`Sockets ${connectedSockets[0].id} and ${connectedSockets[1].id} are now connected in a game.`);
        waitingClients[1] = null;
        waitingClients[2] = null;
        numClients = 0;
    };
    // New connection
    io.on('connection', (socket) => {
        socket.on('newGame', (userName) =>{
            console.log(`${userName} would like to play a game.`);
            socket.join('waitingRoom');
            numClients += 1;
            waitingClients[numClients] = userName;
            if(numClients >= 2) createGame();
        })

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
        socket.on('gameUpdate',({gameID,state}) =>{
            io.to(gameID.toString()).emit('updateState',state); 
        });
    });

    return io;
};