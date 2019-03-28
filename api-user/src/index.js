import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import config from '../config/config';
import typeDefs from './schema/userSchema';
import resolvers from './resolver/userResolver';

const PORT = config.PORT || 4001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const { query } = req.body;
    console.log(query);

    if (query.includes('login')) return { user: 'guest' };
    if (query.includes('addUser')) return { user: 'guest' };

    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ').reverse()[0];
      const decoded = await jwt.verify(token, config.SECRET);

      return {
        user: decoded
      };
    }
  }
});

const app = express();
server.applyMiddleware({ app });
/* eslint-disable no-console */
app.listen({ port: PORT }, () => console.log(`\n 💀  Server ready at http://localhost:${PORT}${server.graphqlPath} \n`));
