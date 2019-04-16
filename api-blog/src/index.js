import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import config from '../config';
import typeDefs from './schema/blogSchema.graphql';
import resolvers from './resolver/blogResolver';

const { PORT } = config || 4001;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
			const token = req.headers.authorization.split(' ').reverse()[0];
			const decoded = await jwt.verify(token, config.SECRET);

			return {
				user: decoded
			};
		}
		return null;
	}
});
const app = express();
server.applyMiddleware({ app });
/* eslint-disable no-console */
app.listen({ port: PORT }, () => console.log(`💀  Blog server ready at http://localhost:${PORT}${server.graphqlPath}`));
