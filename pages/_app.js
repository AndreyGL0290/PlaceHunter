import { UserProvider } from '@auth0/nextjs-auth0/client';
import '/public/css/globals.css';
import React from 'react';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
        <div className='flex flex-col h-screen'>
          <NavBar />
          <div className='flex-grow'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </UserProvider>
  );
}