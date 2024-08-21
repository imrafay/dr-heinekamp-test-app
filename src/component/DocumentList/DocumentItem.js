import React from 'react';
import FileIcon from '../DocumentUtils/FileIcon';
import DownloadDocument from '../DocumentActions/DownloadDocument';
import DeleteDocument from '../DocumentActions/DeleteDocument';

const DocumentItem = ({ doc, isSelected, onSelect, onActionSuccess }) => {
    return (
        <div className="flex items-center bg-white rounded-lg shadow-md p-4 mb-2 hover:bg-gray-50 transition duration-150 ease-in-out">
            <input
                type="checkbox"
                className="mr-4 h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                checked={isSelected}
                onChange={() => onSelect(doc.name)}
            />

            <div className="flex-grow flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                    <FileIcon filename={doc.fileType} className="text-gray-500" />
                </div>
                <div className="ml-4">
                    <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-semibold text-blue-600 hover:underline"
                    >
                        <div className="truncate">{doc.name}</div>
                    </a>
                    <p className="text-gray-600 mt-1">Uploaded on: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="flex-grow-0 mx-4">
                <img
                    src={doc.previewUrl}
                    alt={`Preview of ${doc.name}`}
                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                />
            </div>

            <div className="flex space-x-2">
                <DownloadDocument documentId={doc.name} />
                <DeleteDocument documentName={doc.name} onDeleteSuccess={onActionSuccess} />
            </div>
        </div>
    );
};

export default DocumentItem;
