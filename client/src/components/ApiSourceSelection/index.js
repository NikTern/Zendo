import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_APIS } from '../../utils/mutations';

import { QUERY_USER_PREFERENCES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const ApiSourceSelection = () => {
  const { loading, error, data: preferencesData } = useQuery(QUERY_USER_PREFERENCES);

  const userPreferences = preferencesData?.userPreferences;

  const [quoteApi, setQuoteApi] = useState(null);
  const [videoApi, setVideoApi] = useState(null);
  const [pictureApi, setPictureApi] = useState(null);

  useEffect(() => {
    if (userPreferences) {
      setQuoteApi(userPreferences.quoteApi || 'QUOTE_TOPIC1');
      setVideoApi(userPreferences.videoApi || 'YOUTUBE_TOPIC1');
      setPictureApi(userPreferences.pictureApi || 'UNSPLASH_TOPIC1');
    }
  }, [userPreferences]);

  const [updateApis] = useMutation(UPDATE_APIS, {
    refetchQueries: [{ query: QUERY_USER_PREFERENCES }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateApis({ variables: { quoteApi, videoApi, pictureApi } });
    } catch (error) {
      console.error('Error updating API sources:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!quoteApi || !videoApi || !pictureApi) return null;


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="quoteApi">Quote API:</label>
      <select
        id="quoteApi"
        value={quoteApi}
        onChange={(event) => setQuoteApi(event.target.value)}
      >
        <option value="QUOTE_TOPIC1">Art</option>
        <option value="QUOTE_TOPIC2">Inspirational</option>
        <option value="QUOTE_TOPIC3">Love</option>
      </select>

      <label htmlFor="videoApi">Video API:</label>
      <select
        id="videoApi"
        value={videoApi}
        onChange={(event) => setVideoApi(event.target.value)}
      >
        <option value="YOUTUBE_TOPIC1">Travel & Event</option>
        <option value="YOUTUBE_TOPIC2">Animals & Pets</option>
        <option value="YOUTUBE_TOPIC3">Science & Technology</option>
      </select>

      <label htmlFor="pictureApi">Picture API:</label>
      <select
        id="pictureApi"
        value={pictureApi}
        onChange={(event) => setPictureApi(event.target.value)}
      >
        <option value="UNSPLASH_TOPIC1">Wallpapers</option>
        <option value="UNSPLASH_TOPIC2">Animals</option>
        <option value="UNSPLASH_TOPIC3">Textures & Patterns</option>
      </select>

      <button type="submit">Update API Sources</button>
    </form>
  );
};

export default ApiSourceSelection;
