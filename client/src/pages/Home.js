import React from 'react';
import { useQuery } from '@apollo/client';

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

  //SERVICE WORKER TEST!!(#@*#**#!#*!@(!!))//
  // const [picture, setPicture] = useState(localStorage.getItem('picture') ? JSON.parse(localStorage.getItem('picture')) : null);
  // const [quote, setQuote] = useState(localStorage.getItem('quote') ? JSON.parse(localStorage.getItem('quote')) : null);
  // const [video, setVideo] = useState(localStorage.getItem('video') || null);


  const { loading, error, data: preferencesData } = useQuery(QUERY_USER_PREFERENCES);

  useEffect(() => {
    if (preferencesData && preferencesData.userPreferences && navigator.onLine) {
      fetchPicture();
    }
  }, [preferencesData?.userPreferences?.pictureApi]);

  useEffect(() => {
    if (preferencesData && preferencesData.userPreferences && navigator.onLine) {
      fetchQuote();
    }
  }, [preferencesData?.userPreferences?.quoteApi]);

  useEffect(() => {
    if (preferencesData && preferencesData.userPreferences && navigator.onLine) {
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
    console.log("Picture data:", picData);
    // localStorage.setItem('picture', JSON.stringify(picData)); //serviceworker test
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
    // localStorage.setItem('quote', JSON.stringify(quoteData[0])); //serviceworker test
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
    // localStorage.setItem('video', `https://www.youtube.com/embed/${videoData.videoId}`); //serviceworker test
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <h3 className='flex-row justify-center pt-5 text-center'> Log in or Sign up to see your Zendo!</h3>;

  return (
    <main className='flex-row justify-content-center'>
      <div className="flex-row justify-center">
        <div className='pb-5 pt-5'>{picture && <Picture data={picture} savedItems={preferencesData.userPreferences.savedPictures || []} />}</div>
        <br></br>
        <div className='pt-5 pb-5'>{quote && <Quote data={quote} savedItems={preferencesData.userPreferences.savedQuotes || []} />}</div>
        <br></br>
        <div className='pt-5 w-100'>{video && <YoutubeVideo data={video} savedItems={preferencesData.userPreferences.savedVideos || []} />}</div>
      </div>
    </main>
  );
};

export default Home;
