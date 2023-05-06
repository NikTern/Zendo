import React from 'react';
import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES, QUERY_USER_PREFERENCES } from '../utils/queries';

import { useState, useEffect } from 'react';

//import API components
import Picture from '../components/ApiRendering/UnsplashImage';
import Quote from '../components/ApiRendering/GoodreadsQuote';

//import API functions
import { fetchPicApi1, fetchPicApi2, fetchPicApi3 } from '../utils/api';
import { fetchQuoteApi1, fetchQuoteApi2, fetchQuoteApi3 } from '../utils/api';
import { fetchVidApi1, fetchVidApi2, fetchVidApi3 } from '../utils/api';

const Home = () => {
  const [picture, setPicture] = useState(null);
  const [quote, setQuote] = useState(null);
  const [video, setVideo] = useState(null);

  const { loading, error, data: preferencesData } = useQuery(QUERY_USER_PREFERENCES);

  useEffect(() => {
    if (preferencesData) {
      fetchPicture();
      fetchQuote();
      fetchVideo();
    }
  }, [preferencesData]);

  const fetchPicture = async () => {
    let picData;
    switch (preferencesData.userPreferences.pictureApi) {
      case 'UNSPLASH_TOPIC1':
        picData = await fetchPicApi1();
        break;
      case 'UNSPLASH_TOPIC2':
        picData = await fetchPicApi2();
        break;
      case 'UNSPLASH_TOPIC3':
        picData = await fetchPicApi3();
        break;
      default:
        console.error('Invalid picture API selection');
    }
    setPicture(picData);
  };

  const fetchQuote = async () => {
    console.log('fetchQuote() is called');
    let quoteData;
    switch (preferencesData.userPreferences.quoteApi) {
      case 'GOODREADS_TOPIC1':
        quoteData = await fetchQuoteApi1();
        break;
      case 'GOODREADS_TOPIC2':
        quoteData = await fetchQuoteApi2();
        break;
      case 'GOODREADS_TOPIC3':
        quoteData = await fetchQuoteApi3();
        break;
      default:
        console.error('Invalid quote API selection');
    }
    setQuote(quoteData[0]);
    console.log('Quote data:', quoteData);
  };

  const fetchVideo = async () => {
    let videoData;
    switch (preferencesData.userPreferences.videoApi) {
      case 'YOUTUBE_TOPIC1':
        videoData = await fetchVidApi1();
        break;
      case 'YOUTUBE_TOPIC2':
        videoData = await fetchVidApi2();
        break;
      case 'YOUTUBE_TOPIC3':
        videoData = await fetchVidApi3();
        break;
      default:
        console.error('Invalid video API selection');
    }
    setVideo(videoData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <main>
      <div className="flex-row justify-center">
        <Picture data={picture} />
        {quote && <Quote data={quote} />}
      </div>
    </main>
  );
};

export default Home;
