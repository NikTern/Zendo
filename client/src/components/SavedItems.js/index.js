import React from 'react';
import Picture from '../ApiRendering/UnsplashImage.js';
import Quote from '../ApiRendering/ApiNinjaQuote.js';
import YoutubeVideo from '../ApiRendering/YoutubeVideo.js';
// Import SaveButton component to enable remove functionality

const SavedItems = ({ profile }) => {
  return (
    <div>
      <h4>Saved Pictures</h4>
      {profile.savedPictures.map((picture, index) => (
        <div key={index}>
          <Picture data={{ urls: { regular: picture.url }, alt_description: picture.alt }} savedItems={profile.savedPictures} />
          {/* Add SaveButton component with remove functionality - MAKE DEFAULT REMOVE HERE (BUT ONLY HERE) SINCE ALL ARE SAVED */}
        </div>
      ))}
      
      <h4>Saved Quotes</h4>
      {profile.savedQuotes.map((quote, index) => (
        <div key={index}>
          <Quote data={{ quote: quote.quote, author: quote.author }} savedItems={profile.savedQuotes} />
          {/* Add SaveButton component with remove functionality */}
        </div>
      ))}
      
      <h4>Saved Videos</h4>
      {profile.savedVideos.map((video, index) => (
        <div key={index}>
          <YoutubeVideo data={{ id: { videoId: video.videoId }, snippet: { title: video.title } }} savedItems={profile.savedVideos}/>
          {/* Add SaveButton component with remove functionality */}
        </div>
      ))}
    </div>
  );
};

export default SavedItems;


