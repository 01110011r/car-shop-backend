import { GraphQLError } from "graphql";
import { CategoryModel, MarkaModel } from "../../model";
import { GraphQLUpload } from 'graphql-upload-ts';
import {createWriteStream} from "fs";
import {resolve} from "path"; 


export const resolvers = {

    Query: {
        // model
        model: async (root: undefined, { marka_id }: { marka_id: string }) => {
            try {
                const data = await MarkaModel.findOne({ where: { marka_id } });
                
                return data;

            } catch (error: any) {
                return new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500
                        }
                    }
                })
            }
        },


        //  models
        models: async () => {
            try {
                const data = await MarkaModel.findAll({include:CategoryModel});
        
                return data;

            } catch (error: any) {
                return new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500
                        }
                    }
                })
            }
        }
    },



    Mutation: {
// add
        addmodel: async (root: undefined, { marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id, file }: { marka: string, gearbook: string, tanirovka: boolean, motor: number, year: number, color: string, distance: string, deseription: string, narx: number, category_id:string, file:any }, {token}:{token:string}) => {
            try {
                
                const check = await MarkaModel.findOne({ where: { marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id } });

                let { filename, createReadStream } = await file;
            
                        filename = filename.replace(/\s/g, "");
                     
                        const stream = createReadStream();
                        
                        const out = createWriteStream(resolve("uploads", filename));
                        stream.pipe(out);

                        let newData;

                        if (marka || narx || category_id) {

                          if(!check&&token) newData = await MarkaModel.create({ marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id, marka_img:filename});
                        }


                
                return {
                    msg: !marka || !narx || !category_id ? "insufficient data :(" : check ? "already exists :(" : "ok",
                    data:newData
                };

            } catch (error: any) {
                return new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500
                        }
                    }
                })
            }
        },


        // put
        putmodel:async(root: undefined, {marka_id, marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id, file }: {marka_id:string, marka: string, gearbook: string, tanirovka: boolean, motor: number, year: number, color: string, distance: string, deseription: string, narx: number, category_id:string, file:any }, {token}:{token:string})=>{
            try {
                const check=await MarkaModel.findOne({where:{marka_id}});
  
                let { filename, createReadStream } = await file;
            
                        filename = filename.replace(/\s/g, "");
                        
                        const stream = createReadStream();
                        
                        const out = createWriteStream(resolve("uploads", filename));
                        stream.pipe(out);


                let PutData;
               if(check&&token) PutData=await MarkaModel.update({ marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id, marka_img: filename},{
                    where:{
                        marka_id
                    }
                 });


                 return {
                    msg: check ? "ok" : "notfound  :(",
                    data:check
                 }


            } catch (error:any) {
                return new GraphQLError(error.message,{
                    extensions:{
                        code:"INTERNAL_SERVER_ERROR",
                        http:{
                            status:500
                        }
                    }
                })
            }
        },



        // delete
        deletemodel:async(root:undefined, {marka_id}:{marka_id:string}, {token}:{token:string})=>{
            try {
                const check=await MarkaModel.findOne({where:{marka_id}});

                if(!check&&!token)return new GraphQLError("notfound");


                const deleted=await MarkaModel.destroy({
                    where:{
                        marka_id
                    }
                });


                return {
                    msg:"deleted",
                    data: check
                }
                
            } catch (error:any) {
                return new GraphQLError(error.message,{
                    extensions:{
                        code:"INTERNAL_SERVER_ERROR",
                        http:{
                            status:500
                        }
                    }
                })
            }
        }

    },

    Upload: GraphQLUpload

};

