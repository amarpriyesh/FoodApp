import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="360524463009-qo339qjt896s7iha58pe03utl2rh0q62.apps.googleusercontent.com">
    <React.StrictMode>
      <>
        <Helmet>
          <title>FoodApp</title>
        </Helmet>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
