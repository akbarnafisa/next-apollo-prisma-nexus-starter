import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import { GraphQLError } from "graphql";

import prisma from "../../../lib/api/prisma";
import { schema } from "../../../lib/api/schema";

let apiHandler: ReturnType<typeof startServerAndCreateNextHandler>;

async function getApiHandler() {
  const pluginDisabled =
    process.env.NODE_ENV === "development"
      ? []
      : [ApolloServerPluginLandingPageDisabled()];

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: process.env.NODE_ENV === "development",
    plugins: [
      ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
      ...pluginDisabled,
    ],
    persistedQueries: { ttl: 1500 },
    formatError: (err) => {
      if (err.message.includes("prisma") || err.message.includes("database")) {
        throw new GraphQLError(
          "Your query doesn't match the schema. Try double-checking it!",
          {
            extensions: { path: err.path, locations: err.locations },
          }
        );
      }
      return err;
    },
  });

  if (!apiHandler) {
    apiHandler = startServerAndCreateNextHandler<NextRequest>(server, {
      context: async (req, res) => ({ req, res, prisma }),
    });
  }
  return apiHandler;
}

// export async function GET(request: NextRequest, response: NextResponse) {
//   const handler = await getApiHandler();
//   return handler(request);
// }

// export async function POST(request: NextRequest, response: NextResponse) {
//   const handler = await getApiHandler();
//   return handler(request);
// }

getApiHandler()

export { apiHandler as GET, apiHandler as POST };