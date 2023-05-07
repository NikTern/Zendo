import React from 'react';

import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SkillsList from '../components/SkillsList';
import SkillForm from '../components/SkillForm';

import SavedItems from '../components/SavedItems.js';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import ApiSourceSelection from '../components/ApiSourceSelection';

const Profile = () => {
  // Executing the QUERY_ME query to fetch the logged-in user's information
  const { loading, data } = useQuery(QUERY_ME);

  // Getting the user profile data from the query results
  const profile = data?.me || {};

  // Redirecting to the login page if the user is not logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  // Displaying a loading message while the query is being executed
  if (loading) {
    return <div>Loading...</div>;
  }

  // Rendering the main content of the profile page
  return (
    <div>
      <h1 className="card-header text-center">{`${profile.name}'s profile`}</h1>
      <br></br>

      <h3 className="text-center">Feed Selection</h3>
      <div>
        <ApiSourceSelection />
      </div>

      <br></br>
      <br></br>

      <h3 className="text-center">Saved Items</h3>
      <br></br>

      <p>render saved items here, carousel for each media type</p>
      <p>[this is the Profile.js page, components to render here will be made separately?]</p>
      <SavedItems profile={profile} />

    </div>
  );
};

export default Profile;
