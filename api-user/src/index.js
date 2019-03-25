import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import config from '../config/config';
import typeDefs from './schema/userSchema';
import resolvers from './resolver/userResolver';

dotenv.config();

const PORT = config.PORT || 4002;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
/* eslint-disable no-console */
app.listen({ port: PORT }, () => console.log(`💀  Server ready at http://localhost:${PORT}${server.graphqlPath}`));
