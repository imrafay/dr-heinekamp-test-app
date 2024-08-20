import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadMultipleDocumentsAPI } from '../external/DocumentApi'; // Ensure this function is correctly updated

const UploadDocument = ({ onUploadSuccess }) => {
    const [files, setFiles] = useState([]);

    const onFileChange = event => {
        setFiles(event.target.files);
    };

    const onUpload = async () => {
        if (files.length > 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append('files', file);
            }

            try {
                await uploadMultipleDocumentsAPI(formData);
                toast.success('Files uploaded successfully!');
                onUploadSuccess(); // Notify parent component to refresh document list
                setFiles([]); // Clear files after successful upload
            } catch (error) {
                toast.error('Error uploading files:', error);
            }
        } else {
            toast.warn('Please select files to upload.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col items-center">
                    <label htmlFor="fileInput" className="cursor-pointer w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center">
                        Select Files
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        onChange={onFileChange}
                        className="hidden"
                    />
                    <p className="mt-2 text-gray-600">
                        {files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'No files selected'}
                    </p>
                </div>
                <button
                    onClick={onUpload}
                    className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadDocument;
