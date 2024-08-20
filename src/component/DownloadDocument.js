import React, { useState } from 'react';
import { downloadDocumentAPI } from '../external/DocumentApi';
import { toast } from 'react-toastify';

const DownloadDocument = () => {
    const [documentId, setDocumentId] = useState('');

    const onDownload = () => {
        downloadDocumentAPI(documentId)
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'document.pdf'); // Modify as needed
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => toast.error('Error downloading file:', error));
    };

    return (
        <div>
            <h1>Download Document</h1>
            <input
                type="text"
                placeholder="Enter document ID"
                value={documentId}
                onChange={e => setDocumentId(e.target.value)}
            />
            <button onClick={onDownload}>Download</button>
        </div>
    );
};

export default DownloadDocument;
