import jwt from "jsonwebtoken";
import "dotenv/config";
import { GraphQLError } from "graphql";

export default {
    sign:(data:{}) =>{
        try {
            const key : string =process.env.SECRET_KEY || "";

            return jwt.sign(data, key);
            
        } catch (error:any) {
            return new GraphQLError(error.message);
        }
    },
    verify:(token:string)=>{
        try {
            const key : string =process.env.SECRET_KEY || "";
            
            return jwt.verify(token, key);
            
        } catch (error:any) {
            return new GraphQLError(error.message);
        }
    }
}