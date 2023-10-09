import jwt from "jsonwebtoken";
import "dotenv/config";
import { GraphQLError } from "graphql";

export default {
    sign:(data:{}) =>{
     
            const key : string =process.env.SECRET_KEY || "";
                
            return jwt.sign(data, key);
            
    },

    
    verify:(token:string)=>{
   
            const key : string =process.env.SECRET_KEY || "";
            
            return jwt.verify(token, key);
     
    }
}