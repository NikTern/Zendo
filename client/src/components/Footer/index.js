import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        {location.pathname !== '/' && (
          <button
            className="btn btn-custom2 mb-3"
            onClick={() => navigate(-1)}
            style={{ backgroundColor: 'var(--color-black-blue) !important', color: 'var(--color-white) !important' }}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className='pt-5'>&copy; {new Date().getFullYear()} - Zendo </h4>
      </div>
    </footer>
  );
};

export default Footer;
