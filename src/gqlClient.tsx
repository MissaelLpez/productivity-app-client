import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_API_URL;

export const graphqlClient = new GraphQLClient(endpoint);
