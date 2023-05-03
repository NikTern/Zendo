// Import jsonwebtoken to handle JWTs
const jwt = require('jsonwebtoken');

// Define a secret key and expiration time for JWTs
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  // Middleware function to check for JWTs in incoming requests and verify their authenticity
  authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query, or headers
    // Check for a JWT in the request body, query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If the JWT is in the headers, split the string and return the actual token
        // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no JWT is provided, return the request as is
    if (!token) {
      return req;
    }

    // Verify the JWT and, if valid, add the decoded user data to the request
    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // Return the request with the user data (if the JWT was valid) to be passed to the resolver as `context`
    return req;
  },
  // Function to sign a new JWT with a user's email, name, and _id
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
