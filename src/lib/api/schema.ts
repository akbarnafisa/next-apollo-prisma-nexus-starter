import { makeSchema } from "nexus";
import path from "path";
import UserTypes from "./types/user.type";
import UserQuery from "./query/user.query";
import { validatePlugin } from "nexus-validate";
import { ValidationError } from "yup";
import { GraphQLError } from "graphql";
import UserMutation from "./mutation/user.mutation";

export const schema = makeSchema({
  types: [UserMutation, UserQuery, ...UserTypes],
  outputs: {
    schema: path.join(
      __dirname,
      "..",
      "..",
      "..",
      "src",
      "generated",
      "schema.graphql"
    ),
    typegen: path.join(
      __dirname,
      "..",
      "..",
      "..",
      "src",
      "generated",
      "nexus.ts"
    ),
  },
  contextType: {
    // module: require.resolve('./context'),
    module: path.join(process.cwd(), "src", "lib", "api", "context.ts"),
    export: "Context",
  },
  // sourceTypes: {
  //   modules: [
  //     {
  //       module: "@prisma/client",
  //       alias: "prisma",
  //     },
  //   ],
  // },
  features: {
    abstractTypeStrategies: {
      resolveType: false,
    },
  },
  plugins: [
    // fieldAuthorizePlugin(),
    validatePlugin({
      formatError: ({ error }) => {
        if (error instanceof ValidationError) {
          // convert error to UserInputError from apollo-server
          throw new GraphQLError(error.message.replace("input.", ""), {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: [error.path],
            },
          });
        }
        return error;
      },
    }),
  ],
});
