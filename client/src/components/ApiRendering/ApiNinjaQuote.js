import React from 'react';
import SaveButton from '../SaveButton/index.js';

const Quote = ({ data, savedItems }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-row justify-center w-100 pt-5 pb-5">
      <h2 className='text-center w-100'>{data.quote}</h2>
      <p className='text-center w-100'>{data.author}</p>
      <div className="text-center">
        <SaveButton key={data.quote} type="quote" data={data} savedItems={savedItems} />
      </div>
    </div>
  );
};

export default Quote;