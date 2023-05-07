// import React from 'react';
// import SaveButton from '../SaveButton/index.js';

// const Picture = ({ data }) => {
//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container pb-5">
//       <div className="row justify-content-center">
//         <div className="col-sm-12 col-md-12 col-lg-12">
//           {data.urls && <img src={data.urls.regular} alt={data.alt_description} className="w-100" />}
//         </div>

//         <SaveButton />
        
//       </div>
//     </div>
//   );
// };

// export default Picture;

//----------------------------------------


// import React from 'react';
// import SaveButton from '../SaveButton/index.js';

// const Picture = ({ data }) => {
//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container pb-5">
//       <div className="row justify-content-center">
//         <div className="col-sm-12 col-md-12 col-lg-12">
//           <div style={{ display: 'flex' }}>
//             <img src={data.urls.regular} alt={data.alt_description} className="w-100" />
//             <div style={{ width: '4em', marginLeft: '1em' }}>
//               <SaveButton />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Picture;


//--------------------------------------

//THIS IS THE ONE THAT'S GOOD NOW

import React from 'react';
import SaveButton from '../SaveButton/index.js';

const Picture = ({ data, savedItems }) => { // Add savedItems prop
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pb-5">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <div style={{ display: 'flex' }}>
            <img src={data.urls.regular} alt={data.alt_description} className="w-100" />
            <div style={{ width: '4em', marginLeft: '1em' }}>
              <SaveButton type="picture" data={data} savedItems={savedItems} /> {/* Pass type, data, and savedItems */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Picture;
