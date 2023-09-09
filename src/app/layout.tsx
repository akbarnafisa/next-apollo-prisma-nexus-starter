"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ApolloClient,
  FieldMergeFunction,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import Header from "@/app/components/Layout/Header";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: {
            keyArgs: false,
            merge(existing, incoming, { readField }) {
              const links = existing ? { ...existing.links } : {};
              incoming.links.forEach((link) => {
                links[readField("id", link)] = link;
              });
              return {
                pageInfo: {
                  endCursor: incoming.pageInfo.endCursor,
                  hasNextPage: incoming.pageInfo.hasNextPage,
                },
                links,
              };
            },

            read(existing) {
              if (existing) {
                return {
                  pageInfo: {
                    endCursor: existing.pageInfo.endCursor,
                    hasNextPage: existing.pageInfo.hasNextPage,
                  },
                  links: Object.values(existing.links),
                };
              }
            },
          },
        },
      },
    },
  }),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            {children}
          </body>
        </html>
      </ApolloProvider>
    </UserProvider>
  );
}
