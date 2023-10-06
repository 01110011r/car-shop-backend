import { makeExecutableSchema } from "@graphql-tools/schema";
import marka from "./marka";


export default makeExecutableSchema({
    typeDefs:[marka.td],
    resolvers:[marka.resolvers]
});