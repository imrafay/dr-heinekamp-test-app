import React, { useState, useEffect } from 'react';
import { getDocuments } from '../external/DocumentApi';
import { toast } from 'react-toastify';
import DocumentItem from './DocumentItem';
import DocumentListControls from './DocumentListControls';
import { downloadMultipleDocuments } from './DownloadDocument';

const DocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [documentCount, setDocumentCount] = useState(0);
    const [selectedDocuments, setSelectedDocuments] = useState([]);

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

    const handleActionSuccess = () => {
        fetchDocuments();
        toast.success('Document list updated!');
    };

    const handleSelectDocument = (documentId) => {
        setSelectedDocuments((prevSelected) =>
            prevSelected.includes(documentId)
                ? prevSelected.filter((id) => id !== documentId)
                : [...prevSelected, documentId]
        );
    };

    const handleDownloadSelected = async () => {
        if (selectedDocuments.length === 0) {
            toast.warn('No documents selected for download.');
            return;
        }

        try {
            await downloadMultipleDocuments(selectedDocuments);
            toast.success('Selected documents downloaded successfully!');
        } catch (error) {
            toast.error('Error downloading documents:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <DocumentListControls
                onUploadSuccess={handleActionSuccess}
                selectedDocuments={selectedDocuments}
                onDownloadSelected={handleDownloadSelected}
            />
            <h1 className="text-2xl font-bold mb-4 mt-8">Documents</h1>
            <h1 className="text-xl mb-4">Total Count: {documentCount}</h1>

            <div>
                {documents.map((doc) => (
                    <DocumentItem
                        key={doc.name}
                        doc={doc}
                        isSelected={selectedDocuments.includes(doc.name)}
                        onSelect={handleSelectDocument}
                        onActionSuccess={handleActionSuccess}
                    />
                ))}
            </div>
        </div>
    );
};

export default DocumentList;
