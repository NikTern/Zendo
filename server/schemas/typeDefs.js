const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum QuoteApi {
    QUOTE_API_1
    QUOTE_API_2
    QUOTE_API_3
  }

  enum VideoApi {
    VIDEO_API_1
    VIDEO_API_2
    VIDEO_API_3
  }

  enum PictureApi {
    PICTURE_API_1
    PICTURE_API_2
    PICTURE_API_3
  }

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    quoteApi: QuoteApi
    videoApi: VideoApi
    pictureApi: PictureApi
    skills: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    userPreferences: Profile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    updateApis(quoteApi: QuoteApi, videoApi: VideoApi, pictureApi: PictureApi): Profile

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile
  }
`;

module.exports = typeDefs;
