import express from 'express'
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schemasMap';

const app = express();
const PORT = 8080;

const server = new ApolloServer({
    schema,
});

server
    .start()
        .then(() =>{
            server.applyMiddleware({
                app,
                path:'/graphql'
            });
        })
        .then(() =>{
            console.log(`Apollo server is listening at http://localhost:${ PORT }${server.graphqlPath}.`);
        })


app.use(express.static('./src/client/dist/chess/'));

app.get('/',(req, res) =>{
    console.log('test');
    res.render("index.html");
})

app.listen(PORT,() => {
    console.log(`Server listening on http://localhost:${PORT}.`);
})