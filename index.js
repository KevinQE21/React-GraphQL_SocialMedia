const { ApolloServer } = require('apollo-server');
//const gql = require('graphql-tag');//dependencia de apollo server
const mongoose = require('mongoose')//Libreria de relacion de objetos que nos permite conectar con mongodb

const typeDefs = require('./GraphQL/typeDefs');
const resolvers = require('./GraphQL/resolvers');
const { MONGODB } = require('./config');


//Setup apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//Conectar al db
mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({port: 5000});
    })
//Iniciardor del server donde se realiza una promese y nos da un url
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });