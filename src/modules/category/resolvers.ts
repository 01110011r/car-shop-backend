import { GraphQLError } from "graphql";
import { CategoryModel, MarkaModel } from "../../model";
import { GraphQLUpload } from 'graphql-upload-ts';
import { createWriteStream } from "fs";
import { resolve } from "path";
import JwtHelper from "../../lib/JwtHelper";
import { JwtPayload } from "jsonwebtoken";


export const resolvers = {
    Query: {


        // category
        category: async (_: undefined, { category_id }: { category_id: string }) => {
            try {

                const data: CategoryModel | null = await CategoryModel.findOne({ where: { category_id }, include: MarkaModel });

                return data;


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

        // categories
        categories: async () => {
            try {
                const data = await CategoryModel.findAll({ include: MarkaModel });

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


    // mutation
    Mutation: {



        // add
        addcategory: async (_: undefined, { category, file }: { category: string, file: any }, {token}:{token:string}) => {
            try {

                const check = await CategoryModel.findOne({ where: { category } });

                let { filename, createReadStream } = await file;
           
                filename = filename.replace(/\s/g, "");
      
                const stream = createReadStream();
                
                const out = createWriteStream(resolve("uploads", filename));
                stream.pipe(out);
               
                  let added;
                if (!check&&token){
                     added = await CategoryModel.create({ category, category_img:filename });
                };

                return {
                    msg: "ok",
                    data: added
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
        putcategory: async (_: undefined, { category_id, category, file }: { category_id: string, category: string, file:any }, {token}:{token:string}) => {
            try {

                const check = await CategoryModel.findOne({ where: { category_id } });

             let {filename, createReadStream}=await file;

             filename=filename.replace(/\s/g, "");

             const stream=createReadStream();

             const out=createWriteStream(resolve("uploads", filename));

             stream.pipe(out);

             let newData;
                if(check&&token) newData = await CategoryModel.update({ category, category_img:filename }, {
                    where: {
                        category_id
                    }
                });

                return {
                    msg: check ? "ok" : "notfound :(",
                    data: check
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


        // delete
        deletecategory: async (_: undefined, { category_id }: { category_id: string }, {token}:{token:string}) => {
            try {

                // const abc:string | JwtPayload=JwtHelper.verify(token);

                const check = await CategoryModel.findOne({ where: { category_id } });

                if (!check||!token) return new GraphQLError("AUTETIKATE_ERROR");

                const deleted = await CategoryModel.destroy({
                    where: {
                        category_id
                    }
                });

                return {
                    msg: "deleted",
                    data: deleted
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
        }

    },


    Upload: GraphQLUpload
}