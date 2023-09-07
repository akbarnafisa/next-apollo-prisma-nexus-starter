import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Link = {
  __typename?: 'Link';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageUrl: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  links?: Maybe<Response>;
};


export type QueryLinksArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type Response = {
  __typename?: 'Response';
  links: Array<Maybe<Link>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  bookmarks?: Maybe<Array<Maybe<Link>>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
};

export type LinksDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type LinksDataQuery = { __typename?: 'Query', links?: { __typename?: 'Response', links: Array<{ __typename?: 'Link', category: string, description: string, id: number, imageUrl: string, title: string, url: string } | null>, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage?: boolean | null } | null } | null };


export const LinksDataDocument = gql`
    query LinksData($first: Int, $after: String) {
  links(first: $first, after: $after) {
    links {
      category
      description
      id
      imageUrl
      title
      url
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useLinksDataQuery__
 *
 * To run a query within a React component, call `useLinksDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinksDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinksDataQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useLinksDataQuery(baseOptions?: Apollo.QueryHookOptions<LinksDataQuery, LinksDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinksDataQuery, LinksDataQueryVariables>(LinksDataDocument, options);
      }
export function useLinksDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinksDataQuery, LinksDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinksDataQuery, LinksDataQueryVariables>(LinksDataDocument, options);
        }
export type LinksDataQueryHookResult = ReturnType<typeof useLinksDataQuery>;
export type LinksDataLazyQueryHookResult = ReturnType<typeof useLinksDataLazyQuery>;
export type LinksDataQueryResult = Apollo.QueryResult<LinksDataQuery, LinksDataQueryVariables>;