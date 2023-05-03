const express = require('express');
// Import ApolloServer to create a GraphQL server
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// Import authMiddleware to apply JWT authentication
const { authMiddleware } = require('./utils/auth');

// Import GraphQL type definitions and resolvers
const { typeDefs, resolvers } = require('./schemas');
// Import the database connection
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// Create a new ApolloServer instance with typeDefs, resolvers, and context set to authMiddleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Use middleware to parse incoming request data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// If in production mode, use the built client files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serve the client's index.html file in production mode
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create an async function to start the Apollo server and apply it to the Express app
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  // Start the Express app and listen for incoming requests
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the Apollo server
startApolloServer(typeDefs, resolvers);
