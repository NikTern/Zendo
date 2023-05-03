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

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
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
    }
  }
`;

// export const GET_USER_PREFERENCES = gql`
//   query getUserPreferences($id: ID!) {
//     profile(profileId: $id) {
//       quoteApi
//       videoApi
//       pictureApi
//     }
//   }
// `;

export const QUERY_USER_PREFERENCES = gql`
  query GetUserPreferences {
    userPreferences {
      quoteApi
      videoApi
      pictureApi
    }
  }
`;