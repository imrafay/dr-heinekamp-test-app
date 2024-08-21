import React from 'react';
import UploadDocument from '../DocumentActions/UploadDocument';

const DocumentListControls = ({ onUploadSuccess, selectedDocuments, onDownloadSelected }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <UploadDocument onUploadSuccess={onUploadSuccess} />

            {selectedDocuments.length > 0 && (
                <button
                    onClick={onDownloadSelected}
                    className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Download Selected
                </button>
            )}
        </div>
    );
};

export default DocumentListControls;
