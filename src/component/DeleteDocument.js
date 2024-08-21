import React from 'react';
import { deleteDocumentAPI } from '../external/DocumentApi';
import { toast } from 'react-toastify';

const DeleteDocument = ({ documentName, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await deleteDocumentAPI(documentName);
            toast.success('Document deleted successfully!');
            onDeleteSuccess(); // Refresh document list after deletion
        } catch (error) {
            toast.error('Error deleting document:', error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
            Delete
        </button>
    );
};

export default DeleteDocument;
