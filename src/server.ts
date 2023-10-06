import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { newSequelize } from './config';

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;



const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];






const resolvers = {
  Query: {
    books: () => books,
  },
};







async function main():Promise<void> {
  

  try {
    await newSequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

}


main();