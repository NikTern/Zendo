import React from 'react';

import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SkillsList from '../components/SkillsList';
import SkillForm from '../components/SkillForm';

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
      <h1 className="card-header">{`${profile.name}'s profile`}</h1>
      <br></br>

      <h3>Feed Selection</h3>
      <div>
        <ApiSourceSelection />
      </div>

      <br></br>
      <br></br>

      <h3>Saved Items</h3>
      {profile.skills?.length > 0 && <SkillsList skills={profile.skills} isLoggedInUser={true} />}

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <SkillForm profileId={profile._id} />
      </div>

    </div>
  );
};

export default Profile;
