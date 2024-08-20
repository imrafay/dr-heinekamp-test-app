import React from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage } from 'react-icons/fa';

const FileIcon = ({ filename }) => {

    const getIcon = (type) => {
        switch (type) {
            case 'pdf':
                return <FaFilePdf color="red" />;
            case 'docx':
                return <FaFileWord color="blue" />;
            case 'xlsx':
                return <FaFileExcel color="green" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <FaFileImage color="orange" />;
            default:
                return null;
        }
    };

    return (
        <div>
            {getIcon(filename) || 'Unsupported file type'}
        </div>
    );
};

export default FileIcon;
