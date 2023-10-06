import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { newSequelize } from './config';
import MySchema from "./modules";


async function main(): Promise<void> {


  try {
    await newSequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const server = new ApolloServer({
    schema: MySchema
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({ token: req.headers.token })
  });

  console.log(`🚀  Server ready at: ${url}`);

}


main();