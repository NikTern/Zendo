import React from 'react';
import SaveButton from '../SaveButton/index.js';

const YoutubeVideo = ({ data, savedItems }) => {
  if (!data || !data.id || !data.snippet) {
    return <div>Loading...</div>;
  }

  const videoId = data.id.videoId;
  const videoTitle = data.snippet.title;
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  // return (
  //   <div className="flex-row justify-center pt-5">
  //     {/* <h5 className="text-center w-100">{videoTitle}</h5> */}
  //     <div className='pt-5'>
  //       <div style={{ display: 'flex' }} className='flex-row justify-content-center'>
  //         <iframe
  //           style={{ margin: '0 2em' }} 
  //           width="600rem"
  //           height="300rem"
  //           src={videoSrc}
  //           title={videoTitle}
  //           frameBorder="0"
  //           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //           allowFullScreen
  //         ></iframe>

  //         <div style={{ width: '4em', marginLeft: '0.5em' }}>
  //           <SaveButton key={data.id.videoId} type="video" data={data} savedItems={savedItems} />
  //         </div>
  //       </div>
  //     </div>
  // </div>
  // );


  return (
    <div className="flex-row justify-center pt-5">
      <div className="d-flex align-items-center justify-content-center w-100 pt-5">
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%', /* 16:9 aspect ratio */
            height: 0,
            overflow: 'hidden',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
            src={videoSrc}
            title={videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div
          className="text-center"
        >
          <SaveButton
            key={data.id.videoId}
            type="video"
            data={data}
            savedItems={savedItems}
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideo;