const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum QuoteApi {
    QUOTE_TOPIC1
    QUOTE_TOPIC2
    QUOTE_TOPIC3
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

  type Picture {
    url: String!
    alt: String
  }

  type Quote {
    quote: String!
    author: String
  }

  type Video {
    videoId: String!
    title: String
  }

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    quoteApi: QuoteApi
    videoApi: VideoApi
    pictureApi: PictureApi
    savedPictures: [Picture]
    savedQuotes: [Quote]
    savedVideos: [Video]
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

    savePicture(url: String!, alt: String): Profile
    saveQuote(quote: String!, author: String): Profile
    saveVideo(videoId: String!, title: String): Profile
    removePicture(url: String!): Profile
    removeQuote(quote: String!): Profile
    removeVideo(videoId: String!): Profile

    removeProfile: Profile
  }
`;

module.exports = typeDefs;
