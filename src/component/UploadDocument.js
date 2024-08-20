import React, { useState } from 'react';
import { uploadDocument } from '../external/DocumentApi';
import { toast } from 'react-toastify';

const UploadDocument = () => {
    const [file, setFile] = useState(null);

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onUpload = () => {
        if (file) {
            uploadDocument(file)
                .then(() => toast.success('File uploaded successfully!'))
                .catch(error => toast.error('Error uploading file:', error));
        } else {
            toast.warn('Please select a file to upload.');
        }
    };

    return (
        <div>
            <h1>Upload Document</h1>
            <input type="file" onChange={onFileChange} />
            <button onClick={onUpload}>Upload</button>
        </div>
    );
};

export default UploadDocument;
