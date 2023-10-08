import bcrypt from "bcrypt";
import "dotenv/config";

export default {
    hash:(pass:string )=>{

        const salt : number = Number(process.env.SALT) || 3;

return bcrypt.hash(pass, salt);
    },

    compare:(pass:string, hashpass:string)=>{
        return bcrypt.compare(pass, hashpass);
    }
}