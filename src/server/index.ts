import express from 'express'
import path from 'path';
import sql from 'mssql';
require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import session from 'cookie-session';

import schema from './graphql/schemasMap';

const app = express();
const PORT = 8080;

const config:sql.config = {
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    server: process.env['DB_SERVER'], 
    database: process.env['DB_NAME'], 
    pool:{
      max: 20,
      min: 10,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true,
      trustServerCertificate:true,
    }
};
const appPool = new sql.ConnectionPool(config);

const apolloServer = new ApolloServer({
    schema,
});

appPool.connect()
    .then((pool) =>{
        // DB connection for queries.
        app.locals['db'] = pool;
        // Serve static files.
        app.use(express.static('./src/client/dist/chess/'));
        // Request body parsing.
        app.use(express.json());
        // Wrapper for 15 middleware function securing HTTP headers
        // returned by app.
        app.use(helmet());
        // Trust first proxy.
        // app.set('trust proxy', 1);
        // Set cookie security options.
        // var expiryDate = new Date(Date.now() + 60 * 60 * 1000) 
        // app.use(session({
        // name: 'session',
        // keys: ['key1', 'key2'],
        // cookie: {
        //     secure: true,
        //     httpOnly: true,
        //     domain: 'example.com',
        //     path: 'foo/bar',
        //     expires: expiryDate
        // }
        // }));

        const usersRouter = require('./routers/usersRouter')(app);
        app.use('/api/users', usersRouter);

        const gamesRouter = require('./routers/gamesRouter')(app);
        app.use('/api/games', gamesRouter);

        app.get('/',(req, res) =>{
            res.render("index.html");
        });

        apolloServer.start()
            .then(() =>{
                apolloServer.applyMiddleware({
                    app,
                    path:'/graphql'
                });
            })
            .then(() =>{
                console.log(`Apollo server is listening at http://localhost:${ PORT }${apolloServer.graphqlPath}.`);
            });

        app.listen(PORT,() => {
            console.log(`Server listening on http://localhost:${PORT}.`);
        })
    })
    .catch((e) =>{throw(e)});