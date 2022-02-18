import express from 'express';
import http from 'http';
import path from 'path';
import sql from 'mssql';
require('dotenv').config();
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import session from 'cookie-session';

import schema from './graphql/schemasMap';
import gamesController from './controllers/gamesController';

const app = express();
const server = http.createServer(app);

const PORT = process.env['PORT'] || 8080;

const staticFilesPath: string = process.env['NODE_ENV'] === 'production' ? 'D:/home/site/wwwroot/public' : path.resolve('./dist/public');

const config:sql.config = {
    user: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_USERNAME'] : process.env['DEV_DB_USERNAME']),
    password: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_PASSWORD'] : process.env['DEV_DB_PASSWORD']),
    server: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_SERVER'] : process.env['DEV_DB_SERVER']), 
    database: String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_DB_NAME'] : process.env['DEV_DB_NAME']), 
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
        app.use(express.static(staticFilesPath));
        // Request body parsing.
        app.use(express.json());
        // Wrapper for 15 middleware function securing HTTP headers
        // returned by app.
        //app.use(helmet());

        const usersRouter = require('./routers/usersRouter')(app);
        app.use('/api/users', usersRouter);

        const io = require('./routers/io')(server,app);
        app.set('socketio', io);

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

        server.listen(PORT,() => {
            console.log(`Server listening on http://localhost:${PORT}.`);
        })
    })
    .catch((e) =>{throw(e)});