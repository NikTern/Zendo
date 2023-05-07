import React from 'react';
import { useQuery } from '@apollo/client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES, QUERY_USER_PREFERENCES } from '../utils/queries';

import { useState, useEffect } from 'react';

//import API components
import Picture from '../components/ApiRendering/UnsplashImage';
import Quote from '../components/ApiRendering/ApiNinjaQuote';
import YoutubeVideo from '../components/ApiRendering/YoutubeVideo';

//import API functions
import { fetchPicApi1, fetchPicApi2, fetchPicApi3 } from '../utils/api';
import { fetchQuoteApi1, fetchQuoteApi2, fetchQuoteApi3 } from '../utils/api';
import { fetchVidApi1, fetchVidApi2, fetchVidApi3 } from '../utils/api';

const Home = () => {
  const [picture, setPicture] = useState(null);
  const [quote, setQuote] = useState(null);
  const [video, setVideo] = useState(null);


  const { loading, error, data: preferencesData } = useQuery(QUERY_USER_PREFERENCES);

  // useEffect(() => {
  //   if (preferencesData) {
  //     fetchPicture();
  //     fetchQuote();
  //     fetchVideo();
  //   }
  // }, [preferencesData]);

  // useEffect(() => {
  //   fetchPicture();
  // }, [preferencesData.userPreferences.pictureApi]);
  
  // useEffect(() => {
  //   fetchQuote();
  // }, [preferencesData.userPreferences.quoteApi]);
  
  // useEffect(() => {
  //   fetchVideo();
  // }, [preferencesData.userPreferences.videoApi]);


  useEffect(() => {
    if (preferencesData && preferencesData.userPreferences) {
      fetchPicture();
    }
  }, [preferencesData?.userPreferences?.pictureApi]);

  useEffect(() => {
    if (preferencesData && preferencesData.userPreferences) {
      fetchQuote();
    }
  }, [preferencesData?.userPreferences?.quoteApi]);

  useEffect(() => {
    if (preferencesData && preferencesData.userPreferences) {
      fetchVideo();
    }
  }, [preferencesData?.userPreferences?.videoApi]);


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
    let quoteData;
    switch (preferencesData.userPreferences.quoteApi) {
      case 'QUOTE_TOPIC1':
        quoteData = await fetchQuoteApi1();
        break;
      case 'QUOTE_TOPIC2':
        quoteData = await fetchQuoteApi2();
        break;
      case 'QUOTE_TOPIC3':
        quoteData = await fetchQuoteApi3();
        break;
      default:
        console.error('Invalid quote API selection');
    }
    setQuote(quoteData[0]);
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
  if (error) return <h3 className='flex-row justify-center pt-5 text-center'> Log in or Sign up to see your Zendo!</h3>;

  return (
    <main className=''>
      <div className="flex-row justify-center">
        <div className='pb-5 pt-5'>{picture && <Picture data={picture} savedItems={preferencesData.userPreferences.savedPictures || []} />}</div>
        <br></br>
        <div className='pt-3 pb-5'>{quote && <Quote data={quote} savedItems={preferencesData.userPreferences.savedQuotes || []} />}</div>
        <br></br>
        <div>{video && <YoutubeVideo data={video} savedItems={preferencesData.userPreferences.savedVideos || []} />}</div>
      </div>
    </main>
  );
};

export default Home;
