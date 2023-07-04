import React from 'react';
import '/public/css/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
  );
}