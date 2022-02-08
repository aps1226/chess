import express from 'express'
import path from 'path';
import sql from 'mssql';
require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';

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
        app.locals['db'] = pool;

        app.use(express.static('./src/client/dist/chess/'));
        app.use(express.json());
        
        const usersRouter = require('./routers/usersRouter')(app);
        app.use('/api/users', usersRouter);

        const gamesRouter = require('./routers/gamesRouter')(app);
        app.use('/api/games', gamesRouter);

        app.get('/',(req, res) =>{
            console.log('test');
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