const { AuthenticationError } = require('apollo-server-express');
// Import the Profile model from the models folder
const { Profile } = require('../models');
// Import the signToken function from the auth utility file
const { signToken } = require('../utils/auth');

// Define resolvers for GraphQL queries and mutations
const resolvers = {
  Query: {
    // Define a resolver to get all profiles
    profiles: async () => {
      return Profile.find();
    },

    // Define a resolver to get a single profile by its ID
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

// By adding context to our query, we can retrieve the logged in user without specifically searching for them
    // Define a resolver to get the currently authenticated user's profile
    me: async (parent, args, context) => {
      // If a valid user JWT is provided, return the user's profile
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      // If no valid JWT is provided, throw an authentication error
      throw new AuthenticationError('You need to be logged in!');
    },

    userPreferences: async (parent, args, context) => {
      if (context.user) {
        const profile = await Profile.findOne({ _id: context.user._id });
        return profile;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // Define a mutation to create a new user profile
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },

    // Define a mutation for user login
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      // If no profile with the provided email is found, throw an authentication error
      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      // Check if the provided password is correct
      const correctPw = await profile.isCorrectPassword(password);

      // If the password is incorrect, throw an authentication error
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      // If the email and password are valid, sign and return a new JWT
      const token = signToken(profile);
      return { token, profile };
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      // If the user is authenticated, remove their profile
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an authentication error
      throw new AuthenticationError('You need to be logged in!');
    },

    // Define a mutation to update a user's API preferences
    updateApis: async (parent, { quoteApi, videoApi, pictureApi }, context) => {
      // If the user is authenticated, update their API preferences
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { quoteApi, videoApi, pictureApi },
          { new: true }
        );
      }
      // If the user is not authenticated, throw an authentication error
      throw new AuthenticationError('You need to be logged in!');
    },

    // add savePicture, saveQuote, saveVideo, removePicture, removeQuote, and removeVideo resolvers.
    savePicture: async (parent, { url, alt }, context) => {
      if (context.user) {
        const profile = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedPictures: { url, alt } } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You must be logged in to do this!");
    },

    saveQuote: async (parent, { quote, author }, context) => {
      if (context.user) {
        const profile = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedQuotes: { quote, author } } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You must be logged in to do this!");
    },

    saveVideo: async (parent, { videoId, title }, context) => {
      if (context.user) {
        const profile = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedVideos: { videoId, title } } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You must be logged in to do this!");
    },

    removePicture: async (parent, { url }, context) => {
      if (context.user) {
        const profile = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedPictures: { url } } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You must be logged in to do this!");
    },

    removeQuote: async (parent, { quote }, context) => {
      if (context.user) {
        const profile = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedQuotes: { quote } } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You must be logged in to do this!");
    },

    removeVideo: async (parent, { videoId }, context) => {
      if (context.user) {
        const profile = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedVideos: { videoId } } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You must be logged in to do this!");
    }
  },
};

// Export the resolvers so they can be used by the Apollo server
module.exports = resolvers;