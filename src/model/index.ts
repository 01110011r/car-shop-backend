import { newSequelize } from "../config";
import { CategoryModel } from "./category.model";
import { MarkaModel } from "./marka.model";


CategoryModel.hasMany(MarkaModel,{
    foreignKey:"category_id"
});

newSequelize.sync({alter:true});

export {CategoryModel, MarkaModel};