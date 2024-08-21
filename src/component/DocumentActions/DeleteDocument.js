import React from 'react';
import { deleteDocumentAPI } from '../../external/DocumentApi';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const DeleteDocument = ({ documentName, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            await deleteDocumentAPI(documentName);
            toast.success('Document deleted successfully!');
            onDeleteSuccess();
        } catch (error) {
            toast.error('Error deleting document:', error);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="icon-button text-red-500 hover:bg-red-100"
        >
            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </button>
    );
};

export default DeleteDocument;
