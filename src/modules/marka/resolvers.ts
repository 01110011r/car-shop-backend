import { GraphQLError } from "graphql";
import { MarkaModel } from "../../model";



export const resolvers = {

    Query: {
        // model
        model: async (root: undefined, { marka_id }: { marka_id: string }) => {
            try {
                console.log(marka_id);


                const data = await MarkaModel.findOne({ where: { marka_id } });
                return {
                    msg: data ? "ok" : "notfound",
                    data
                }
            } catch (error: any) {
                console.log(error.message);
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
                const data = await MarkaModel.findAll();
                console.log(data);
                return {
                    msg: data ? "ok" : "notfound",
                    data
                }

            } catch (error: any) {
                console.log(error.message);
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
        addmodel: async (root: undefined, { marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id }: { marka: string, gearbook: string, tanirovka: boolean, motor: number, year: number, color: string, distance: string, deseription: string, narx: number, category_id:string }) => {
            try {
                if (!marka || !gearbook || !narx || !category_id) {
                    return new GraphQLError("malumot yetarli emas :(");
                }

                const check = await MarkaModel.findOne({ where: { marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id } });

                if (check) return {
                    msg: "already exists !"
                };

                const newData = await MarkaModel.create({ marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id});

                
                return {
                    msg:"ok",
                    data:newData
                };

            } catch (error: any) {
                console.log(error.message);
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
        putmodel:async(root: undefined, {marka_id, marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id }: {marka_id:string, marka: string, gearbook: string, tanirovka: boolean, motor: number, year: number, color: string, distance: string, deseription: string, narx: number, category_id:string })=>{
            try {
                const check=await MarkaModel.findOne({where:{marka_id}});

                if(!check)return new GraphQLError("notfound");

                 const PutData=await MarkaModel.update({ marka, gearbook, tanirovka, motor, year, color, distance, deseription, narx, category_id},{
                    where:{
                        marka_id
                    }
                 });


                 return {
                    msg:"ok",
                    data:PutData
                 }


            } catch (error:any) {
                console.log(error.message);
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
        deletemodel:async(root:undefined, {marka_id}:{marka_id:string})=>{
            try {
                const check=await MarkaModel.findOne({where:{marka_id}});

                if(!check)return new GraphQLError("notfound");


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
                console.log(error.message);
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

    }

};

// marka_id:ID
// marka:String
// gearbook:String
// tanirovka:Boolean
// motor:Int
// year:Int
// color:String
// distance:String
// deseription:String
// narx:Int