import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_APIS } from '../../utils/mutations';

import { QUERY_USER_PREFERENCES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const ApiSourceSelection = () => {
  const { data: preferencesData } = useQuery(QUERY_USER_PREFERENCES, {
    onError: (error) => console.error(error),
  });

  const userPreferences = preferencesData?.userPreferences;

  const [quoteApi, setQuoteApi] = useState(userPreferences?.quoteApi || 'QUOTE_API_1');
  const [videoApi, setVideoApi] = useState(userPreferences?.videoApi || 'VIDEO_API_1');
  const [pictureApi, setPictureApi] = useState(userPreferences?.pictureApi || 'PICTURE_API_1');

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

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="quoteApi">Quote API:</label>
      <select
        id="quoteApi"
        value={quoteApi}
        onChange={(event) => setQuoteApi(event.target.value)}
      >
        <option value="QUOTE_API_1">Quote API 1</option>
        <option value="QUOTE_API_2">Quote API 2</option>
        <option value="QUOTE_API_3">Quote API 3</option>
      </select>

      <label htmlFor="videoApi">Video API:</label>
      <select
        id="videoApi"
        value={videoApi}
        onChange={(event) => setVideoApi(event.target.value)}
      >
        <option value="VIDEO_API_1">Video API 1</option>
        <option value="VIDEO_API_2">Video API 2</option>
        <option value="VIDEO_API_3">Video API 3</option>
      </select>

      <label htmlFor="pictureApi">Picture API:</label>
      <select
        id="pictureApi"
        value={pictureApi}
        onChange={(event) => setPictureApi(event.target.value)}
      >
        <option value="PICTURE_API_1">Picture API 1</option>
        <option value="PICTURE_API_2">Picture API 2</option>
        <option value="PICTURE_API_3">Picture API 3</option>
      </select>

      <button type="submit">Update API Sources</button>
    </form>
  );
};

export default ApiSourceSelection;
