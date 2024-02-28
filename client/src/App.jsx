import { useState } from "react";
import "./App.css";

// import statement below after building queries and mutations
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// Apollo server subscription requirements
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { Outlet } from "react-router-dom";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});
// initalize websocket link
const authToken = localStorage.getItem("id_token");
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3001/subscriptions",
    connectionParams: {
      authToken: authToken,
    },
  })
);

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: splitLink,
  cache: new InMemoryCache(),
  /*  defaultOptions: {
    watchQuery: {
      pollInterval: 30000,
    },
  }, */
});
// flex-row justify-center align-center min-100-vh
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-light">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
