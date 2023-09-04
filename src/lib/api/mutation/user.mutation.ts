import { intArg, nonNull, mutationType, arg } from "nexus";
import { Context } from "../context";
import { userInputSchema } from "../../validation/schema";
import { GraphQLError } from "graphql";

const UserMutation = mutationType({
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        input: nonNull(arg({ type: "UserInput" })),
      },
      validate: () => ({
        input: userInputSchema,
      }),
      resolve: (_, { input: { name } }, context: Context) => {
        return context.prisma.user.create({
          data: {
            name,
          },
        });
      },
    });

    t.nonNull.field("updateUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
        input: nonNull(arg({ type: "UserInput" })),
      },
      validate: ({ number }) => ({
        id: number().required(),
        input: userInputSchema,
      }),
      resolve: async (_, { id, input: { name } }, context: Context) => {
        const findUser = await context.prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!findUser) {
          throw new GraphQLError("User not found!", {
            extensions: {
              code: "USER_NOT_FOUND",
            },
          });
        }

        return context.prisma.user.update({
          where: { id: findUser.id },
          data: {
            name,
          },
        });
      },
    });

    t.nonNull.field("deleteUser", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      validate: ({ number }) => ({
        id: number().required(),
      }),
      resolve: async (_, { id }, context: Context) => {
        const findUser = await context.prisma.user.findUnique({
          where: {
            id,
          },
        });

        if (!findUser) {
          throw new GraphQLError("User not found!", {
            extensions: {
              code: "USER_NOT_FOUND",
            },
          });
        }

        return context.prisma.user.delete({
          where: { id: findUser.id },
        });
      },
    });
  },
});

export default UserMutation;
