import React from 'react';
import Head from 'next/head';
import Header from './Header';


const Layout = ({children}) => {
    return (
      <>
        <Head>
          <link
            href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
            rel="stylesheet"
          />
          <title>REACT NODE SEND</title>
        </Head>
        
        <div className = "bg-gray-200 min-h-screen">
            <div className = "container mx-auto">
                <Header />
                <main className = "mt-20">
                    {children}
                </main>
            </div>
        </div>

      </>
    );
}
 
export default Layout;