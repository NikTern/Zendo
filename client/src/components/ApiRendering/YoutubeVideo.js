import React from 'react';

const YoutubeVideo = ({ data }) => {
  if (!data || !data.id || !data.snippet) {
    return <div>Loading...</div>;
  }

  const videoId = data.id.videoId;
  const videoTitle = data.snippet.title;
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="flex-row justify-center pt-5">
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

// import React from 'react';

// const YoutubeVideo = ({ data }) => {
//   if (!data || !data.id || !data.snippet) {
//     return <div>Loading...</div>;
//   }

//   const videoId = data.id.videoId;
//   const videoTitle = data.snippet.title;
//   const videoSrc = `https://www.youtube.com/embed/${videoId}`;

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-sm-12 col-md-8 col-lg-6">
//           <h5 className="text-center">{videoTitle}</h5>
//           <div className="embed-responsive embed-responsive-16by9">
//             <iframe
//               className="embed-responsive-item"
//               src={videoSrc}
//               title={videoTitle}
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YoutubeVideo;
