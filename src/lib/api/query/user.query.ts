import { intArg, nonNull, queryType } from "nexus";
import { Context } from "../context";

const UserQuery = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      resolve(_, _args, ctx: Context) {
        return ctx.prisma.user.findMany();
      },
    });
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      validate: ({ number }) => ({
        id: number().required(),
      }),
      resolve(_, { id }, ctx: Context) {
        return ctx.prisma.user.findUnique({ where: { id } });
      },
    });
  },
});

export default UserQuery;
