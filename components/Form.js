import React, { useState } from 'react';
import { useAppContext } from '../context/app/appContext';

const Form = () => {

    const [password, setPassword]=  useState(false);
    const { addPassword, addDownloads } = useAppContext();

    return (
        <div className = "w-full mt-20">
            <label className = "text-lg text-gray-800">Delete after</label>
            <div>
                <select 
                    className = "appearance-none rounded w-full my-4 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rouded leading-none focus:outline-none focus:border-gray-500"
                    onChange = {e => addDownloads(parseInt(e.target.value))}
                >
                    <option value = "" disabled>-- Downloads --</option>
                    <option value = "1">1 Download</option>
                    <option value = "5">5 Downloads</option>
                    <option value = "10">10 Downloads</option>
                    <option value = "20">20 Downloads</option>
                </select>
            </div>

            <div>
                <div className = "flex items-center">
                    <label className = "text-lg text-gray-800 mr-2">Protect with password</label>
                    <input 
                        onChange = {() => setPassword(!password)}
                        value = {password} type = "checkbox" />
                </div>
                {
                    password ? (
                        <input 
                            type = "password"
                            onChange = {e => addPassword(e.target.value)}
                            className = "appearance-none rounded w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rouded leading-none focus:outline-none focus:border-gray-500"
                        />
                    ): null
                }

            </div>
        </div>
    );
}
 
export default Form;