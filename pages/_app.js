import { UserProvider } from '@auth0/nextjs-auth0/client';
import '/public/css/globals.css';
import React from 'react';

import Layout from './layout';

export default function App({ Component, pageProps }) {
  return (
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
  );
}