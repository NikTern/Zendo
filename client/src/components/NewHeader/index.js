import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
      <div className="container flex-row justify-space-between-lg justify-center align-center text-center pb-5 pt-5 w-100">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Zendo
          </h1>
        </Link>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-custom3 m-2" to="/me">
                My Zendo
              </Link>
              <button className="btn btn-lg btn-custom4 m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-custom3 m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-custom4 m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
  );
};

export default Header;
