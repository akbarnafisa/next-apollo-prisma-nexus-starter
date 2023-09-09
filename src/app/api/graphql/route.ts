import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { GraphQLError } from "graphql";

import prisma from "../../../lib/api/prisma";
import { schema } from "../../../lib/api/schema";
import { Context } from "../../../lib/api/context";
let apiHandler: ReturnType<typeof startServerAndCreateNextHandler>;

async function getApiHandler({ prisma, user, accessToken }: Context) {
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
      if (
        err.message === "Not authorized" // nexus authorize plugin error message
      ) {
        throw new GraphQLError("Unauthorized", {
          extensions: {
            code: "UNAUTHENTICATED",
            path: err.path,
            locations: err.locations,
          },
        });
      } else if (
        err.message.includes("prisma") ||
        err.message.includes("database")
      ) {
        throw new GraphQLError(
          "Your query doesn't match the schema. Try double-checking it!",
          {
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
              path: err.path,
              locations: err.locations,
            },
          }
        );
      }
      return err;
    },
  });

  if (!apiHandler) {
    apiHandler = startServerAndCreateNextHandler(server, {
      context: async (req, res) => ({ req, res, prisma, user, accessToken }),
    });
  }
  return apiHandler;
}

const getUserSession = async (req: NextRequest, res: NextResponse) => {
  const session = await getSession();
  // if the user is not logged in, return an empty object
  if (!session || typeof session === "undefined") return {};

  const { user, accessToken } = session;

  return {
    user,
    accessToken,
  };
};

export async function GET(request: NextRequest, response: NextResponse) {
  const handler = await getApiHandler({ prisma });
  return handler(request);
}

export async function POST(request: NextRequest, response: NextResponse) {
  const session = await getSession();
  const handler = await getApiHandler({
    prisma,
    accessToken: session?.accessToken,
    user: session?.user,
  });
  return handler(request);
}
