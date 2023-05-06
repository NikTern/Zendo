import React from 'react';

const Picture = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.urls && <img src={data.urls.regular} alt={data.alt_description} />}
    </div>
  );
};

export default Picture;