import React, { useState, useEffect } from 'react';
import { getDocuments } from '../external/DocumentApi';
import { toast } from 'react-toastify';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [documentCount, setDocumentCount] = useState(0);

    useEffect(() => {
        getDocuments()
            .then((data) => {
                setDocuments(data.documents);
                setDocumentCount(data.documentsCount);
            })
            .catch(error => toast.error('Error fetching documents:', error));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Document List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <div key={doc.name} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-start">
                        <img
                            src={doc.iconUrl}
                            alt="icon"
                            className="w-16 h-16 mb-4"
                        />
                        <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-blue-600 hover:underline"
                        >
                            {doc.name}
                        </a>
                        <p className="text-gray-600 mt-2">Uploaded on: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DocumentList;
