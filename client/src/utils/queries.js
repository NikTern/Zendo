import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      skills
      savedPictures {
        url
        alt
      }
      savedQuotes {
        quote
        author
      }
      savedVideos {
        videoId
        title
      }
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
      savedPictures {
        url
        alt
      }
      savedQuotes {
        quote
        author
      }
      savedVideos {
        videoId
        title
      }
    }
  }
`;

// export const QUERY_USER_PREFERENCES = gql`
//   query GetUserPreferences {
//     userPreferences {
//       quoteApi
//       videoApi
//       pictureApi
//     }
//   }
// `;


export const QUERY_USER_PREFERENCES = gql`
  query {
    userPreferences {
      _id
      quoteApi
      videoApi
      pictureApi
      savedPictures {
        url
      }
    }
  }
`;


// export const QUERY_SINGLE_PROFILE = gql`
//   query singleProfile($profileId: ID!) {
//     profile(profileId: $profileId) {
//       _id
//       name
//       skills
//     }
//   }
// `;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       name
//       skills
//     }
//   }
// `;