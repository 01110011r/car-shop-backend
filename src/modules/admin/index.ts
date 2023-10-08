import fs from "fs";
import path from "path";
import { resolvers } from "./resolvers";


const td=fs.readFileSync(path.join(process.cwd(), "src", "modules", "admin", "schema.gql"), "utf-8");
// console.log(td);


export default {resolvers, td};