import { DataTypes, Model, UUIDV4 } from "sequelize";
import { newSequelize } from "../config";




export class CategoryModel extends Model { };



CategoryModel.init(
    {

        category_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_img: {
            type: DataTypes.STRING
        }

    },
    {
        sequelize: newSequelize,
        modelName: "categories",
        paranoid: true,
        timestamps: true,
        deletedAt: true
    }
);

// CategoryModel.sync({alter:true});