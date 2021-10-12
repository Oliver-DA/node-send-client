import React from 'react';

const Alert = ({message}) => {
    
    return (
        <div className = "rounded bg-pink-600 py-2 px-3 w-full max-w-lg my-5 text-center text-white mx-auto">
            {message}
        </div>
    );
}
 
export default Alert;