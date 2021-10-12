import Layout from '../../components/Layout';
import axiosClient from '../../config/axiosClient';
import React, { useState } from 'react';
import { useAppContext } from '../../context/app/appContext';
import Alert from '../../components/Alert';

export async function getServerSideProps({params}) {
    const response = await axiosClient.get(`/api/links/${params.links}`);
    console.log(response.data)
    return {
        props: { 
            link: response.data
        }
    }
}

export async function getServerSidePaths() {

    const response = await axiosClient.get("/api/links");
    console.log(response.data)
    return {
        paths: response.data.links.map(link => ({params: {links: link.url}})),
        fallback: false
    }
}

const Link = ({link}) => {

    const { showAlert, message_file } = useAppContext();
    const [hasPassword, setHasPassword] = useState(link.password);
    const [password, setPassword] = useState("");
    const [fileLink, setFileLink] = useState(link.file);

    
    const confirmPassword = async (e) => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const response = await axiosClient.post(`/api/links/${link.link}`, data);
            setFileLink(response.data.file)
            setHasPassword(response.data.password)

        } catch (error) {
            showAlert(error.response.data.msg)
        }

    }

    return (
      <Layout>
        {hasPassword ? (
          <>
            <p className = "text-center uppercase font-bold">This file is protectec with a password</p>
            {message_file && <Alert message = {message_file} />}
            
            <div className = "flex justify-center mt-5">
                <div className="w-full max-w-lg">
                <form
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit = {confirmPassword}
                >
                    <div className="mb-4">
                    <label
                        className="block text-black text-sm font-bold mb-2"
                        htmlFor="password"
                    >Password
                    </label>

                    <input
                        className="shadow appeareance-none border mb-5 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        name="password"
                        value = {password}
                        onChange = {e => setPassword(e.target.value)}
                        id="password"
                    />

                    <input
                        type="submit"
                        className="bg-pink-600 rounded hover:bg-gray-900 cursor-pointer w-full p-2 text-white font-bold upppercase"
                        value="Confirm"
                    />
                    </div>
                </form>
                </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center text-gray-700">
              Download your file
            </h1>
            <div className="flex items-center justify-center mt-10">
              <a
                href={`${process.env.backendURL}/api/file/${fileLink}`}
                className="bg-pink-500 rounded-lg text-white font-bold cursor-pointer uppercase text-center px-10 py-3"
              >
                Here
              </a>
            </div>
          </>
        )}
      </Layout>
    );
}

export default Link;