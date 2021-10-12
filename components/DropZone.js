import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppContext } from "../context/app/appContext";
import { useAuth } from "../context/auth/authContext";
import Form from '../components/Form';

const DropZone = () => {
  const { showAlert, uploadFiles, loading, createLink } = useAppContext();
  const { authenticated } = useAuth();

  const onDropRejected = () => {
    showAlert(
      "This file is to large create an account to obtain more benefits"
    );
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    uploadFiles(formData, acceptedFiles[0].path);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const files = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="px-4 mx-4 md:flex-1 mb-3 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-2 bg-gray-100 border-gray-400">

      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
          <ul>{files}</ul>
          {
            authenticated ? <Form /> : null
          }
          {loading ? (
            <div className="loader"></div>
          ) : (
            <button
              onClick={() => createLink()}
              className="bg-pink-600 w-full py-3 px-5 font-bold rounded-lg text-white my-10 hover:bg-pink-700"
            >
              Create Link
            </button>
          )}

        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>

          <input className="h-100" {...getInputProps()} />
          
          {isDragActive ? (
            <p className="text-2xl text-center font-bold text-gray-600">
              DROP IT
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold text-center text-gray-600">
                Select a file and drag it here
              </p>
              <button className="bg-pink-600 py-3 px-5 font-bold rounded-lg text-white my-10 hover:bg-pink-700">
                Choose File
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default DropZone;
