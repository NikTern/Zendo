// import React from 'react';
// import { Link } from 'react-router-dom';
// import Auth from '../../utils/auth';
// import { Layout, Typography, Menu } from 'antd';

// const { Header } = Layout;
// const { Title, Text } = Typography;

// const NewHeader = () => {
//   const logout = () => {
//     Auth.logout();
//   };

//   return (
//     <Header style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '1200px', padding: '0 24px' }}>
//         <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
//           <Title style={{ margin: 0, fontSize: '3rem' }}>Zendo</Title>
//         </Link>
//         <Menu mode="horizontal" theme="dark" style={{ borderBottom: 'none' }} triggerSubMenuAction="click">
//           {Auth.loggedIn() ? (
//             <>
//               <Menu.Item key="1">
//                 <Link to="/me">My Zendo</Link>
//               </Menu.Item>
//               <Menu.Item key="2" onClick={logout}>
//                 Logout
//               </Menu.Item>
//             </>
//           ) : (
//             <>
//               <Menu.Item key="3">
//                 <Link to="/login">Login</Link>
//               </Menu.Item>
//               <Menu.Item key="4">
//                 <Link to="/signup">Signup</Link>
//               </Menu.Item>
//             </>
//           )}
//         </Menu>
//       </div>
//       <Text style={{ fontSize: '1.65rem', fontWeight: 100, color: 'black', textAlign: 'center' }}>A homepage for the internet</Text>
//     </Header>
//   );
// };

// export default NewHeader;


import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    // <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
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
    // </header>
  );
};

export default Header;
