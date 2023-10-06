import { makeExecutableSchema } from "@graphql-tools/schema";
import marka from "./marka";
import category from "./category";

export default makeExecutableSchema({
    typeDefs:[marka.td, category.td],
    resolvers:[marka.resolvers, category.resolvers]
});
