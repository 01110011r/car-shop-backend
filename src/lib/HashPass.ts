import bcrypt from "bcrypt";
import "dotenv/config";

export default {
    hash:(pass:any)=>{

        const salt : number = Number(process.env.SALT) || 3;

return bcrypt.hash(String(pass), salt);
    },

    compare:(pass:any, hashpass:any)=>{
        return bcrypt.compare(String(pass), String(hashpass));
    }
}