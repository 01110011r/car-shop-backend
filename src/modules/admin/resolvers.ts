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


        // // putadmin
        // putadmin: async (_: undefined, __: undefined, { token }: { token: string }) => {
        //     try {

        //         if (!token) new GraphQLError("")
        //         const myToken: any = token || "";

        //         const { adminname, password }: any = TokenGenerate.verify(myToken);

        //         const check: any = await AdminModel.findOne({ where: { adminname } });

        //         if (!check) return new GraphQLError("notfound  :(");

        //         const equal = await cripto.compare(password, check.password);

        //         if (!equal) return { msg: "wrong password  :(" };

        //         const token = await TokenGenerate.sign({ adminname, password });

        //         return {
        //             msg: "ok",
        //             data: token
        //         };


        //     } catch (error: any) {
        //         return new GraphQLError(error.message, {
        //             extensions: {
        //                 code: "INTERNAL_SERVER_ERROR",
        //                 http: {
        //                     status: 500
        //                 }
        //             }
        //         });
        //     }
        // },





    }
}