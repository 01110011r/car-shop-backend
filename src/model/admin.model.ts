import { DataTypes, Model } from "sequelize";
import { newSequelize } from "../config";


export class AdminModel extends Model{};


AdminModel.init(
    {
admin_id:{
    type:DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4
},
adminname:{
    type:DataTypes.STRING,
    allowNull:false
},
password:{
    type:DataTypes.STRING,
    allowNull:false
}
    },
    {
        sequelize:newSequelize,
        tableName:"admins",
        timestamps:true
    }
);