import { GraphQLError } from "graphql";
import { CategoryModel, MarkaModel } from "../../model";


export const resolvers = {
    Query: {


        // category
        category: async (_: undefined, { category_id }: { category_id: string }) => {
            try {

                const data : CategoryModel | null = await CategoryModel.findOne({ where: { category_id }, include: MarkaModel });
                console.log(data);

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

                console.log(data);

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
        }




    },


    // mutation
    Mutation: {



        // add
        addcategory: async (_: undefined, { category }: { category: string }) => {
            try {

                const check = await CategoryModel.findOne({ where: { category } });

                if (check) return {
                    msg: "already exists  :(",
                    data: check
                };

                const added = await CategoryModel.create({ category });

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
        putcategory: async (_: undefined, { category_id, category }: { category_id: string, category: string }) => {
            try {

                const check = await CategoryModel.findOne({ where: { category_id } });

                if (!check) return {
                    msg: "notfound  :(",
                };

                const newData = await CategoryModel.update({ category }, {
                    where: {
                        category_id
                    }
                });

                return {
                    msg: "ok",
                    data: newData
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


        // delete
        deletecategory: async (_: undefined, { category_id }: { category_id: string }) => {
            try {

                const check = await CategoryModel.findOne({ where: { category_id } });

                if (!check) return {
                    msg: "notfound  :(",
                };

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




    }
}