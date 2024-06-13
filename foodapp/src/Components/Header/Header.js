import logo from '../../logo.svg';
import './Header.scss';
import { useStore } from '../../store/StoreContext';
import AboutUs from '../AboutUs/AboutUs';
import { Link } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Header() {

  const { changeUploadPage } = useStore();
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const handleClick = () => {
    changeUploadPage(true)
  }

  useEffect(
    () => {
      if (user) {
        axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json'
            }
        })
        .then((res) => {
            console.log(res.data);
            setProfile(res.data);
        })
        .catch((err) => console.log(err));
      }
    },
    [ user ]
  );

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
        <header className="header bg-midnight">
            <nav className="navbar">
                <div onClick={handleClick}>
                  <img src={logo} className="App-logo navbar_logo" alt="logo" />
                </div>
                <ul className="nav-links navbar_list">
                  <li><Link to="/" onClick={handleClick} className="navbar_link text-white-950 font-medium">Home</Link></li>
                  <li><Link to="/about" className="navbar_link text-white-950 font-medium">About</Link></li>
                  <li><Link to="/aichat" className="navbar_link text-white-950 font-medium">AI Bot</Link></li>
                  <li><a href="#" className="navbar_link text-white-950 font-medium">Contact</a></li>
                </ul>
                {profile ? (
                  <div>
                      <button onClick={logOut}>Log out</button>
                  </div>
                ) : (
                    <button onClick={login} className="navbar_link text-white-950 font-medium">Sign in with Google 🚀</button>
                )}
            </nav>
        </header>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link bg-yellow-500 text-white p-4"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       We are in header
    //     </a>
    //   </header>
    // </div>
  );
}

export default Header;
