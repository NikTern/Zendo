import React from 'react';

import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SavedItems from '../components/SavedItems.js';

import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import ApiSourceSelection from '../components/ApiSourceSelection';


//import useonline
// import useOnlineStatus from '../components/OnlineCheck/useOnlineStatus';
// import { useEffect } from 'react';


const Profile = () => {
  
  //-----------//
  // const isOnline = useOnlineStatus();

  // useEffect(() => {
  //   if (isOnline) {
  //     // Call your API functions to refresh the data when the user goes from offline to online
  //     fetchData();
  //   }
  // }, [isOnline]);

  // const fetchData = async () => {
  //   const { loading, data } = useQuery(QUERY_ME);
  //   // Update your component state or context with the fetched data
  // };
  //-----------//


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
      <h1 className="card-header text-center">{`${profile.name}'s Zendo`}</h1>
      <br></br>

      <h3 className="text-center">Feed Preferences</h3>
      <div className='flex-row justify-content-center w-100'>
        <ApiSourceSelection />
      </div>

      <br></br>
      <br></br>

      <h3 className="text-center">Saved Items</h3>
      <br></br>

      <SavedItems profile={profile} />  
    </div>
  );
};

export default Profile;
