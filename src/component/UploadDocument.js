import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadMultipleDocumentsAPI } from '../external/DocumentApi'; // Ensure this function is correctly updated
import { generatePreview } from './GeneratePreview'; // Ensure generatePreview function is defined properly

function getFileNameWithoutExtension(filename) {
    const dotIndex = filename.lastIndexOf('.');
    if (dotIndex === -1) {
        return filename;
    }
    return filename.substring(0, dotIndex);
}


const UploadDocument = ({ onUploadSuccess }) => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const onFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);

        // Generate previews for all selected files
        const previewPromises = selectedFiles.map(async (file) => {
            const preview = await generatePreview(file);
            return {
                file,
                preview: new File([preview], `${getFileNameWithoutExtension(file.name)}_preview.png`, {
                    type: 'image/png',
                }),
            };
        });

        const previewFiles = await Promise.all(previewPromises);

        setFiles(selectedFiles);
        setPreviews(previewFiles);
    };

    const onUpload = async () => {
        if (files.length > 0) {
            const formData = new FormData();

            files.forEach((file, index) => {
                // Append the original file
                formData.append('files', file);

                // Append the preview file
                if (previews[index]) {
                    formData.append('previews', previews[index].preview);
                }
            });

            try {
                await uploadMultipleDocumentsAPI(formData);
                toast.success('Files uploaded successfully!');
                onUploadSuccess(); // Notify parent component to refresh the document list
                setFiles([]); // Clear files after successful upload
                setPreviews([]);
            } catch (error) {
                toast.error('Error uploading files:', error);
            }
        } else {
            toast.warn('Please select files to upload.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Upload Documents</h1>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col items-center">
                    <label htmlFor="fileInput" className="cursor-pointer w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center">
                        Select Files
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        onChange={onFileChange}
                        className="hidden"
                    />
                    <p className="mt-2 text-gray-600">
                        {files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'No files selected'}
                    </p>
                </div>

                {/* Display preview images */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(preview.preview)}
                                alt={`Preview of ${files[index].name}`}
                                className="w-full h-auto rounded-md border border-gray-300"
                            />
                            <p className="mt-2 text-sm text-center text-gray-600">{files[index].name}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onUpload}
                    className="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadDocument;
