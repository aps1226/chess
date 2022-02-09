import express, { Application, RequestHandler } from 'express';
import gamesController from '../controllers/gamesController';

module.exports = (app:Application) =>{

    const router = express.Router();

    const db = app.locals['db'];

    // Create a new game based on participating player ID's.
    router.post('/newGame',
    gamesController.newGame(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(201);
    });
    
    // Find a game based on a game ID.
    router.post('/findGame',
    gamesController.findGame(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(201);
        res.send(result);
    });

    // Update a game based on a game ID.
    router.patch('/',
    gamesController.updateGame(db),
    gamesController.findGame(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(201);
        res.send(result);
    });

    return router;
};