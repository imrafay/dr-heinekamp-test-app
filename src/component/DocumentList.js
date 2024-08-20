import React, { useState, useEffect } from 'react';
import { getDocuments } from '../external/DocumentApi';
import { toast } from 'react-toastify';
import FileIcon from './FileIcon';
import UploadDocument from './UploadDocument';
import DownloadDocument from './DownloadDocument';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [documentCount, setDocumentCount] = useState(0);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const data = await getDocuments();
            setDocuments(data.documents);
            setDocumentCount(data.documentsCount);
        } catch (error) {
            toast.error('Error fetching documents:', error);
        }
    };

    const handleUploadSuccess = () => {
        fetchDocuments(); // Refresh document list after a successful upload
        toast.success('Document list updated!');
    };

    const documentDisplayList = (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
                <div key={doc.name} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start">
                    <FileIcon filename={doc.iconUrl} />
                    <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                        {doc.name}
                    </a>
                    <p className="text-gray-600 mt-2">Uploaded on: {new Date(doc.uploadDate).toLocaleDateString()}</p>

                    <DownloadDocument documentId={doc.name} />
                </div>
            ))}
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <UploadDocument onUploadSuccess={handleUploadSuccess} />
            <h1 className="text-2xl font-bold mb-4 mt-8">Documents</h1>
            <h1 className="text-xl mb-4">Total Count: {documentCount}</h1>
            {documentDisplayList}
        </div>
    );
};

export default DocumentList;
