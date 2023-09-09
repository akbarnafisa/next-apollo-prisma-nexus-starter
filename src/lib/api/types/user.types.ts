import { enumType, inputObjectType, objectType } from "nexus";
import { Context } from "../context";

const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id");
    t.string("email");
    t.field("role", {
      type: 'Role',
    });
    t.string("image");
    t.list.field('bookmarks', {
      type: 'Link',
      async resolve({ id }, _args, ctx) {
        return await ctx.prisma.user.findUnique({
          where: {
            id
          }
        }).bookmarks()
      }
    })
  },
});

const RoleType = enumType({
  name: "Role",
  members: ["USER", "ADMIN"],
});

const UserTypes = [User, RoleType];

export default UserTypes;
