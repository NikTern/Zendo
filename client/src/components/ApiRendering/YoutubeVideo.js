import React from 'react';

const YoutubeVideo = ({ data }) => {
  if (!data || !data.id || !data.snippet) {
    return <div>Loading...</div>;
  }

  const videoId = data.id.videoId;
  const videoTitle = data.snippet.title;
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="flex-row justify-center">
      <h5 className="text-center w-100">{videoTitle}</h5>
      <iframe
        className='w-100'
        width="560"
        height="415"
        src={videoSrc}
        title={videoTitle}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeVideo;
