import React from 'react';

const Quote = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-row justify-center">
      <h2 className='text-center w-100'>{data.quote}</h2>
      <p className='text-center w-100'>{data.author}</p>
    </div>
  );
};

export default Quote;
