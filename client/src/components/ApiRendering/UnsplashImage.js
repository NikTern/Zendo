import React from 'react';

const Picture = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container pb-5">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-12 col-lg-12">
          {data.urls && <img src={data.urls.regular} alt={data.alt_description} className="w-100" />}
        </div>
      </div>
    </div>
  );
};

export default Picture;
