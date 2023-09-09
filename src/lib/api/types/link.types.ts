import { inputObjectType, objectType } from "nexus";

const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nonNull.string("url");
    t.nonNull.string("category");
    t.nonNull.string("imageUrl");

    t.list.field("users", {
      type: "User",
      async resolve({ id }, _args, ctx) {
        return await ctx.prisma.link
          .findUnique({
            where: {
              id,
            },
          })
          .users();
      },
    });
  },
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.string("endCursor");
    t.boolean("hasNextPage");
  },
});

export const Response = objectType({
  name: "Response",
  definition(t) {
    t.field("pageInfo", {
      type: PageInfo,
    });
    t.nonNull.list.nonNull.field("links", {
      type: "Link",
    });
  },
});

const LinkInput = inputObjectType({
  name: 'LinkInput',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.string('description');
    t.nonNull.string('url');
    t.nonNull.string('imageUrl');
    t.nonNull.string('category');
  },
});

const LinkTypes = [Link, PageInfo, Response, LinkInput];

export default LinkTypes;
