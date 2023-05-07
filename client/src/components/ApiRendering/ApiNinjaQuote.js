import React from 'react';
import SaveButton from '../SaveButton/index.js';

const Quote = ({ data, savedItems }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="flex-row justify-center w-100 pt-5 pb-5">
    //   <h2 className='text-center w-100'>{data.quote}</h2>
    //   <p className='text-center w-100'>{data.author}</p>
    // </div>

    <div className="flex-row justify-center w-100 pt-5 pb-5">
      <h2 className='text-center w-100'>{data.quote}</h2>
      <p className='text-center w-100'>{data.author}</p>
      <div className="text-center">
        <SaveButton type="quote" data={data} savedItems={savedItems} />
      </div>
    </div>
  );
};

export default Quote;

// import React from 'react';

// const Quote = ({ data }) => {
//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-sm-12 col-md-8 col-lg-6">
//           <h2 className="text-center">{data.quote}</h2>
//           <p className="text-center">{data.author}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Quote;