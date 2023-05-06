import React from 'react';

const Quote = ({ data }) => {
  console.log('Quote component data:', data);
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{data.quote}</h2>
      <p>{data.author}</p>
    </div>
  );
};

export default Quote;
