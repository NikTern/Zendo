const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum QuoteApi {
    GOODREADS_TOPIC1
    GOODREADS_TOPIC2
    GOODREADS_TOPIC3
  }

  enum VideoApi {
    YOUTUBE_TOPIC1
    YOUTUBE_TOPIC2
    YOUTUBE_TOPIC3
  }

  enum PictureApi {
    UNSPLASH_TOPIC1
    UNSPLASH_TOPIC2
    UNSPLASH_TOPIC3
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
