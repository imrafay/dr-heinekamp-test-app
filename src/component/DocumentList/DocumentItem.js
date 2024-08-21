import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import FileIcon from '../DocumentUtils/FileIcon';
import DownloadDocument from '../DocumentActions/DownloadDocument';
import DeleteDocument from '../DocumentActions/DeleteDocument';
import { toast } from 'react-toastify';

const ONE_HOUR = 60 * 60 * 1000; // One hour in milliseconds

const DocumentItem = ({ doc, isSelected, onSelect, onActionSuccess }) => {
    // Get the current time
    const now = new Date().getTime();
    // Calculate the document's upload time in milliseconds
    const uploadTime = new Date(doc.uploadDate).getTime();
    // Check if the document's upload time is within one hour
    const isWithinOneHour = (now - uploadTime) <= ONE_HOUR;

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            toast.success('Link copied to clipboard!');
        }).catch(err => {
            toast.error('Failed to copy link:', err);
        });
    };

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

                    <div className="truncate">{doc.name}</div>
                    <p className="text-gray-600 mt-1">Uploaded on: {new Date(doc.uploadDate).toLocaleString()}</p>
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
                {isWithinOneHour ? (
                    <button
                        onClick={() => copyToClipboard(doc.tempUrl)}
                        className="icon-button text-blue-500 hover:bg-blue-100"
                    >
                        <FontAwesomeIcon icon={faShareAlt} size="lg" />
                    </button>
                ) : (
                    <button
                        className="icon-button disabled"
                        disabled
                    >
                        <FontAwesomeIcon icon={faShareAlt} size="lg" />
                    </button>
                )}
                <DownloadDocument documentId={doc.name} />
                <DeleteDocument documentName={doc.name} onDeleteSuccess={onActionSuccess} />

            </div>
        </div>
    );
};

export default DocumentItem;
