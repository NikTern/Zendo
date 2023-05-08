import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;


export const UPDATE_APIS = gql`
  mutation updateApis($quoteApi: QuoteApi, $videoApi: VideoApi, $pictureApi: PictureApi) {
    updateApis(quoteApi: $quoteApi, videoApi: $videoApi, pictureApi: $pictureApi) {
      _id
      quoteApi
      videoApi
      pictureApi
    }
  }
`;

export const SAVE_PICTURE = gql`
  mutation savePicture($url: String!, $alt: String) {
    savePicture(url: $url, alt: $alt) {
      _id
      savedPictures {
        url
        alt
      }
    }
  }
`;

export const REMOVE_PICTURE = gql`
  mutation removePicture($url: String!) {
    removePicture(url: $url) {
      _id
      savedPictures {
        url
        alt
      }
    }
  }
`;

export const SAVE_QUOTE = gql`
  mutation saveQuote($quote: String!, $author: String) {
    saveQuote(quote: $quote, author: $author) {
      _id
      savedQuotes {
        quote
        author
      }
    }
  }
`;

export const REMOVE_QUOTE = gql`
  mutation removeQuote($quote: String!) {
    removeQuote(quote: $quote) {
      _id
      savedQuotes {
        quote
        author
      }
    }
  }
`;


export const SAVE_VIDEO = gql`
  mutation saveVideo($videoId: String!, $title: String!) {
    saveVideo(videoId: $videoId, title: $title) {
      _id
      savedVideos {
        videoId
        title
      }
    }
  }
`;

export const REMOVE_VIDEO = gql`
  mutation removeVideo($videoId: String!) {
    removeVideo(videoId: $videoId) {
      _id
      savedVideos {
        videoId
        title
      }
    }
  }
`;