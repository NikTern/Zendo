import React from 'react';
import Picture from '../ApiRendering/UnsplashImage.js';
import Quote from '../ApiRendering/ApiNinjaQuote.js';
import YoutubeVideo from '../ApiRendering/YoutubeVideo.js';
// Import Carousel from Ant Design
import { Carousel } from 'antd';



const SavedItems = ({ profile }) => {
  
  return (
    <div>
      <h4>Quotes</h4>
      <Carousel autoplay speed={1500} autoplaySpeed={6000}>
        {profile.savedQuotes.map((quote, index) => (
          <div key={index}>
            <Quote
              data={{ quote: quote.quote, author: quote.author }}
              savedItems={profile.savedQuotes}
            />
          </div>
        ))}
      </Carousel>

      <h4>Videos</h4>
      <Carousel autoplay speed={1500} autoplaySpeed={6000} className='pb-5'>
        {profile.savedVideos.map((video, index) => (
          <div key={index}>
            <YoutubeVideo
              data={{ id: { videoId: video.videoId }, snippet: { title: video.title } }}
              savedItems={profile.savedVideos}
            />
          </div>
        ))}
      </Carousel>

      <br></br>
      <br></br>
      <h4 className='pt-5'>Pictures</h4>
      <div className=''>
        <Carousel autoplay speed={1500} autoplaySpeed={6000}>
          {profile.savedPictures.map((picture, index) => (
            <div key={index}>
              <Picture
                data={{ urls: { regular: picture.url }, alt_description: picture.alt }}
                savedItems={profile.savedPictures}
              />
            </div>
          ))}
        </Carousel>
      </div>

    </div>
  );
};

export default SavedItems;
