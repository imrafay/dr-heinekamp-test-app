import React, { useState } from 'react';
import { uploadDocument } from '../external/DocumentApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to import Toastify CSS

const UploadDocument = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onUpload = () => {
        if (file) {
            uploadDocument(file)
                .then(() => {
                    toast.success('File uploaded successfully!');
                    onUploadSuccess();
                })
                .catch(error => toast.error('Error uploading file:', error));
        } else {
            toast.warn('Please select a file to upload.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload Document</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <input
                    type="file"
                    onChange={onFileChange}
                    className="mb-4 w-full text-gray-700 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={onUpload}
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadDocument;
