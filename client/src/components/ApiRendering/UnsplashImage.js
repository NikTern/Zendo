import React from 'react';
import SaveButton from '../SaveButton/index.js';

const Picture = ({ data, savedItems }) => { 
  if (!data || !data.urls || !data.urls.regular) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pb-5">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-12">
            <img src={data.urls.regular} alt={data.alt_description} className="w-100" />
            <div className="text-center">
              <SaveButton key={data.urls.regular} type="picture" data={data} savedItems={savedItems} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Picture;
