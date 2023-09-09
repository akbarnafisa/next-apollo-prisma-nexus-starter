import { intArg, nonNull, queryType, stringArg } from "nexus";
import { Context } from "../context";

// https://www.youtube.com/watch?v=Pr2nee9aBKw&list=PLn2e1F9Rfr6k6MwzS-p9FGK1NDBxxwLPk&index=17

const LinkQuery = queryType({
  definition(t) {
    t.field("links", {
      type: "Response",
      args: {
        first: intArg(),
        after: stringArg(),
      },
      async resolve(_, args, ctx: Context) {
        // check if there is a cursor as the argument
        let queryResult = null;
        if (args.after) {
          queryResult = await ctx.prisma.link.findMany({
            take: Number(args.first), // the number of items to return from the db
            skip: 1, // skip the cursor
            cursor: {
              id: args.after, // the cursor
            },
          });
        } else {
          // if no cursor, this means that this is the first request
          // and we will return the first items in the db
          queryResult = await ctx.prisma.link.findMany({
            take: Number(args.first),
          });
        }

        if (queryResult.length > 0) {
          // get last element in previous result set
          const lastLinkResults = queryResult[queryResult.length - 1];
          // cursor we'll return in subsequent requests
          const myCursor = lastLinkResults.id;

          // query after the cursor to check if we have nextPage
          const secondQueryResults = await ctx.prisma.link.findMany({
            take: Number(args.first),
            cursor: {
              id: myCursor,
            },
          });
          // return response
          return {
            pageInfo: {
              endCursor: String(myCursor),
              // if the number of items requested is greater than the response of the second query, 
              // we have another page
              hasNextPage: secondQueryResults.length >= Number(args.first),
            },
            links: queryResult,
          };
        }
        // data not found
        return {
          pageInfo: {
            endCursor: null,
            hasNextPage: false,
          },
          links: [],
        };
      },
    });
  },
});

export default LinkQuery;
