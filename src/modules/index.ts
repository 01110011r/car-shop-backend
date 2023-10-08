import { makeExecutableSchema } from "@graphql-tools/schema";
import marka from "./marka";
import category from "./category";
import admin from "./admin";


export default makeExecutableSchema({
    typeDefs:[marka.td, category.td, admin.td],
    resolvers:[marka.resolvers, category.resolvers, admin.resolvers]
});
