//---PICTURE API'S---//
// Fetch random image for Topic 1
export const fetchPicApi1 = async () => {
    const response = await fetch('/api/unsplash/wallpapers');
    const data = await response.json();
    return data;
  };
  
  // Fetch random image for Topic 2
  export const fetchPicApi2 = async () => {
    const response = await fetch('/api/unsplash/animals');
    const data = await response.json();
    return data;
  };
  
  // Fetch random image for Topic 3
  export const fetchPicApi3 = async () => {
    const response = await fetch('/api/unsplash/textures-patterns');
    const data = await response.json();
    return data;
  };


//---QUOTE API'S---//
export const fetchQuoteApi1 = async () => {
    // Fetch data from quote API 1
};

export const fetchQuoteApi2 = async () => {
    // Fetch data from quote API 2
};

export const fetchQuoteApi3 = async () => {
    // Fetch data from quote API 3
};



//---VIDEO API'S---//
export const fetchVidApi1 = async () => {
    // Fetch data from video API 1
}

export const fetchVidApi2 = async () => {
    // Fetch data from video API 2
}

export const fetchVidApi3 = async () => {
    // Fetch data from video API 3
}


