import { GraphQLError } from "graphql";
import { AdminModel } from "../../model";
import TokenGenerate from "../../lib/JwtHelper";
import cripto from "../../lib/HashPass";
import { JwtPayload } from "jsonwebtoken";


export const resolvers = {

    Query: {
        // admin
        admin: async (_: undefined, { admin_id }: { admin_id: string }) => {
            try {
                const data = await AdminModel.findOne({ where: { admin_id } });

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

            };
        },


        // admins
        admins: async () => {
            try {
                const data = await AdminModel.findAll();

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

            };
        }

    },




    Mutation: {

        // signup
        signup: async (_: undefined, { adminname, password }: { adminname: string, password: string }) => {
            try {
                password = await cripto.hash(password);

                const token = await TokenGenerate.sign({ adminname, password });

                const check = await AdminModel.findOne({ where: { adminname } });

                if (check) return new GraphQLError("already exists  :(");

                await AdminModel.create({ adminname, password });

                return {
                    msg: "ok",
                    data: token
                };


            } catch (error: any) {
                return new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500
                        }
                    }
                });
            }
        },



        // signin
        signin: async (_: undefined, { adminname, password }: { adminname: string, password: string }) => {
            try {
                const check: any = await AdminModel.findOne({ where: { adminname } });

                if (!check) return new GraphQLError("notfound  :(");

                const equal = await cripto.compare(password, check.password);

                if (!equal) return { msg: "wrong password  :(" };

                const token = await TokenGenerate.sign({ adminname, password });

                return {
                    msg: "ok",
                    data: token
                };


            } catch (error: any) {
                return new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500
                        }
                    }
                });
            }
        },


        // putadmin
        putadmin:async(_:undefined, args:{}, {token}:{token:string})=>{
            try {
             const {adminname, password} : any= await TokenGenerate.verify(token);

             const check = await AdminModel.findOne({where:{adminname, password}});

             let newData;
             if(check)newData=await AdminModel.update(args,{where:{adminname}});

             return {
                msg:check ? "ok" : "undefined",
                data:newData
             }
                
            } catch (error:any) {
                return new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500
                        }
                    }
                });
            }
        },



        // deletadmin
        deletadmin:async(_:undefined, __:undefined,{token}:{token:string})=>{
            try {
                
                const {admin_id} : any= await TokenGenerate.verify(token);

                const check = await AdminModel.findOne({where:{admin_id}});
   
                if(check)await AdminModel.destroy({where:{admin_id}});

                return {
                    msg: check ? "ok" : "undefined",
                    data: check
                }


            } catch (error:any) {
                return new GraphQLError(error.message, {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500
                        }
                    }
                });
            }
        }
    }
}