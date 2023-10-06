import {Sequelize} from "sequelize";
import "dotenv/config";

const dburl : string = process.env.DB_URL || 'postgres://user:pass@example.com:5432/dbname';



export const newSequelize=new Sequelize(dburl,{
    logging:false
});



