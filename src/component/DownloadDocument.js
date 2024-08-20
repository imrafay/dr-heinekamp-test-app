import React from 'react';
import { downloadDocumentAPI } from '../external/DocumentApi';
import { toast } from 'react-toastify';

const DownloadDocument = ({ documentId }) => {
    const onDownload = () => {
        downloadDocumentAPI(documentId)
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', documentId);
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => toast.error('Error downloading file:', error));
    };

    return (
        <button
            className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={onDownload}>Download</button>
    );
};

export default DownloadDocument;
