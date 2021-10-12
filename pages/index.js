import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/auth/authContext';
import Link from 'next/link';
import DropZone from '../components/DropZone';
import Alert from '../components/Alert';
import { useAppContext } from '../context/app/appContext';

const Home = () => {

  const [copy, setCopy] = useState(false);
  const { message, authenticatedUser } = useAuth();
  const { message_file, url } = useAppContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authenticatedUser()
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)
    setCopy(true);

    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }

  return (
    <Layout>
      <div className = "md:w-4/5 xl:w-3/5 mx-auto mb-32">
      { url ? (
        <>
          <p
            className = "text-center text-2xl mt-10"
          ><span className = "font-bold text-red-700 text-2xl uppercase">Your url: </span>{`${process.env.frontendURL}/links/${url}`}</p>
           <button
              onClick = {handleCopy}
              className = {`${copy ? "bg-gray-900": "bg-pink-600"} w-full py-3 px-5 font-bold rounded-lg mt-10 text-white`}
          >{ copy ? "Copied" : "Copy URL"}</button>
        </>
      ): (
        <>
          { message_file && <Alert message = {message_file} />}
          { message && <Alert message = {message} />}
          <div className = "lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <DropZone />
            <div className = "md:flex-1 mb-3 mt-16 lg:mt-0">
              <h2 className = "text-4xl font-sans font-bold text-gray-800 ">
                Share files in a secure an simple way
              </h2>
              <p className = "text-lg leading-loose my-4">
                <span className = "text-red-500 font-bold">ReactNodeSend</span>{" "}
                Allows you to share files through an internet conecction fron any where to any where
              </p>
              <Link href = "/new-account">
                <a className = "text-red-500 font-bold text-lg hover:text-red-700">Create an account to get more benefits</a>
              </Link>
            </div>

          </div>
        </>
      )}
      </div>
    </Layout>
  );
}
 
export default Home;