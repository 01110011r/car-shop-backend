import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import { newSequelize } from './config';
import MySchema from "./modules";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { graphqlUploadExpress } from 'graphql-upload-ts';



interface MyContext {
  token?: string
}

async function main(): Promise<void> {
  try {
    await newSequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const app = express();

  const httpServer = http.createServer(app);


  const server = new ApolloServer<MyContext>({
    schema: MySchema,
    csrfPrevention: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });


  await server.start();


  app.use('/',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 3 }),
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: '20mb' }),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  );


  await new Promise<void>((resolve) => httpServer.listen({ port: 4001 }, resolve));


  console.log(`🚀 Server ready at http://localhost:4001/`);

}


main();