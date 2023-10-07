import { DataTypes, Model, UUID } from "sequelize";
import { newSequelize } from "../config";


export class MarkaModel extends Model { };

MarkaModel.init(
    {

        marka_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        marka: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gearbook: {
            type: DataTypes.STRING
        },
        tanirovka: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        motor: {
             type:DataTypes.INTEGER
        },
        year:{
            type:DataTypes.INTEGER
        },
        color:{
            type:DataTypes.STRING
        },
        distance:{
            type:DataTypes.STRING
        },
        deseription:{
            type:DataTypes.STRING
        },
        narx:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        tashqi_img:{
            type:DataTypes.STRING
        },
        ichki_img:{
            type:DataTypes.STRING
        },
        model_img:{
            type:DataTypes.STRING
        },
        category_id:{
            type:UUID,
            allowNull:false
        }
    },
    {
        sequelize: newSequelize,
        modelName:"markas",
        timestamps:true,
        paranoid:true,
        deletedAt:true
    }
);

// MarkaModel.sync({alter:true});