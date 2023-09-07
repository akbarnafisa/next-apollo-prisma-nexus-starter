"use client";
import Head from "next/head";
import { AwesomeLink } from "./components/AwesomeLink";
import { useLinksDataQuery } from "@/generated/graphql";
import { useCallback, useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 2;

export default function Home() {
  // const [endCursor, setEndCursor] = useState<string | null>();
  const { data, loading, error, fetchMore } = useLinksDataQuery({
    // fetchPolicy: "cache-and-network",
    // nextFetchPolicy: "cache-first",
    // notifyOnNetworkStatusChange: true,
    variables: {
      first: PAGE_SIZE,
      after: null,
    },
  });

  

  const hasNextPage = useMemo(() => {
    return data?.links?.pageInfo?.hasNextPage;
  }, [data]);

  const endCursor = useMemo(() => {
    return data?.links?.pageInfo?.endCursor;
  }, [data]);

  const handleLoadMore = useCallback(async () => {
    await fetchMore({
      variables: { first: PAGE_SIZE, after: endCursor },
    });
  }, [endCursor, fetchMore]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto max-w-5xl my-20">
        {loading && <p>loading...</p>}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links?.links.map((link) => (
            <AwesomeLink
              key={link.id}
              url={link.url}
              id={link.id}
              category={link.category}
              title={link.title}
              description={link.description}
              imageUrl={link.imageUrl}
            />
          ))}
        </ul>
        {hasNextPage ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={handleLoadMore}
          >
            More
          </button>
        ) : (
          <p className="my-10 text-center font-medium">
            You have reach the end!
          </p>
        )}
      </div>
    </div>
  );
}
