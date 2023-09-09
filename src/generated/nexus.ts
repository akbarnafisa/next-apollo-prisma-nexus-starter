/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../lib/api/context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import type { ValidateResolver } from "nexus-validate"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  LinkInput: { // input type
    category: string; // String!
    description: string; // String!
    imageUrl: string; // String!
    title: string; // String!
    url: string; // String!
  }
}

export interface NexusGenEnums {
  Role: "ADMIN" | "USER"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Link: { // root type
    category: string; // String!
    description: string; // String!
    id: string; // String!
    imageUrl: string; // String!
    title: string; // String!
    url: string; // String!
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor?: string | null; // String
    hasNextPage?: boolean | null; // Boolean
  }
  Query: {};
  Response: { // root type
    links: NexusGenRootTypes['Link'][]; // [Link!]!
    pageInfo?: NexusGenRootTypes['PageInfo'] | null; // PageInfo
  }
  User: { // root type
    email?: string | null; // String
    id: string; // String!
    image?: string | null; // String
    role?: NexusGenEnums['Role'] | null; // Role
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Link: { // field return type
    category: string; // String!
    description: string; // String!
    id: string; // String!
    imageUrl: string; // String!
    title: string; // String!
    url: string; // String!
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Mutation: { // field return type
    createLink: NexusGenRootTypes['Link']; // Link!
  }
  PageInfo: { // field return type
    endCursor: string | null; // String
    hasNextPage: boolean | null; // Boolean
  }
  Query: { // field return type
    links: NexusGenRootTypes['Response'] | null; // Response
  }
  Response: { // field return type
    links: NexusGenRootTypes['Link'][]; // [Link!]!
    pageInfo: NexusGenRootTypes['PageInfo'] | null; // PageInfo
  }
  User: { // field return type
    bookmarks: Array<NexusGenRootTypes['Link'] | null> | null; // [Link]
    email: string | null; // String
    id: string; // String!
    image: string | null; // String
    role: NexusGenEnums['Role'] | null; // Role
  }
}

export interface NexusGenFieldTypeNames {
  Link: { // field return type name
    category: 'String'
    description: 'String'
    id: 'String'
    imageUrl: 'String'
    title: 'String'
    url: 'String'
    users: 'User'
  }
  Mutation: { // field return type name
    createLink: 'Link'
  }
  PageInfo: { // field return type name
    endCursor: 'String'
    hasNextPage: 'Boolean'
  }
  Query: { // field return type name
    links: 'Response'
  }
  Response: { // field return type name
    links: 'Link'
    pageInfo: 'PageInfo'
  }
  User: { // field return type name
    bookmarks: 'Link'
    email: 'String'
    id: 'String'
    image: 'String'
    role: 'Role'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createLink: { // args
      input: NexusGenInputs['LinkInput']; // LinkInput!
    }
  }
  Query: {
    links: { // args
      after?: string | null; // String
      first?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    resolveType: false
    __typename: false
    isTypeOf: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
    /**
     * Validate mutation arguments.
     */
    validate?: ValidateResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}