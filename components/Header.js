import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/auth/authContext';
import { useAppContext } from '../context/app/appContext';

const Header = () => {

    const { user, logOut } = useAuth();
    const { cleanState } = useAppContext();
    const router = useRouter();

    const redirect = () => {
        router.push("/")
        cleanState();
    }

    return (

        <header className = "py-8  flex flex-col md:flex-row items-center justify-between">
            
            <img
                onClick = {redirect}
                className = "w-64 cursor-pointer mb-8 md:mb-0" src = "/logo.svg"
            />

            <div>
                {
                    user ? (
                        <div className = "flex items-center">
                            <p className = "text-xl">Hi there! <strong>{user.name}</strong></p>
                            <button
                                onClick = {() => logOut()}
                                className = "uppercase rounded-xl bg-pink-500 text-white font-bold px-4 py-2 ml-4 text-white hover:bg-pink-600">
                                LogOut
                            </button>
                        </div>
                    ): (
                        <>
                            <Link  href = "/new-account">
                            <a className = " uppercase rounded-lg font-bold px-3 py-2 bg-pink-600 hover:bg-pink-500 mr-4 text-white">Create account</a>
                            </Link>
                            <Link  href = "/login">
                                <a className = " uppercase rounded-lg font-bold px-3 py-2 bg-gray-900 hover:bg-gray-700 text-white">Log in</a>
                            </Link>
                        </>
                    )
                }

            </div>
        </header>
    );
}
 
export default Header;