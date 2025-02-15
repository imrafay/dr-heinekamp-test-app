import React from 'react';
import { downloadDocumentAPI, downloadMultipleDocumentsAPI } from '../../external/DocumentApi';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export const downloadMultipleDocuments = async (documentIds) => {
    try {
        const response = await downloadMultipleDocumentsAPI(documentIds);

        if (response.data) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'documents.zip');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } else {
            toast.error('No data returned for download.');
        }
    } catch (error) {
        toast.error('Error downloading files:', error);
    }
};


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
            className="icon-button text-blue-500 hover:bg-blue-100"
            onClick={onDownload}>
            <FontAwesomeIcon icon={faDownload} size="lg" />
        </button>
    );
};

export default DownloadDocument;
