import ApolloClient, { createNetworkInterface } from 'apollo-client';

const apolloUri = 'http://localhost:3030/graphql'; //|| process.env.APOLLO_URI;

const networkInterface = createNetworkInterface({ uri: apolloUri });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // get the authentication token from local storage if it exists
    req.options.headers.authorization = localStorage.getItem('token') || null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
  reduxRootSelector: (state) => state.get('apollo'),
});

export default client;

export const apolloReducer = client.reducer();
