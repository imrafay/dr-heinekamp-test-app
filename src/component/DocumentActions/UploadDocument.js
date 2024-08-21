import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadMultipleDocumentsAPI } from '../../external/DocumentApi';
import { generatePreview } from '../DocumentUtils/GeneratePreview';

function getFileNameWithoutExtension(filename) {
    const dotIndex = filename.lastIndexOf('.');
    return dotIndex === -1 ? filename : filename.substring(0, dotIndex);
}

const UploadDocument = ({ onUploadSuccess }) => {
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const onFileChange = async (event) => {
        const selectedFiles = Array.from(event.target.files);

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
                formData.append('files', file);
                if (previews[index]) {
                    formData.append('previews', previews[index].preview);
                }
            });

            try {
                await uploadMultipleDocumentsAPI(formData);
                toast.success('Files uploaded successfully!');
                onUploadSuccess();
                setFiles([]);
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
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload Documents</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <div className="flex flex-col items-center">
                    <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center transition ease-in-out duration-200">
                        Select Files
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        multiple
                        onChange={onFileChange}
                        className="hidden"
                    />
                    <p className="mt-3 text-gray-600">
                        {files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'No files selected'}
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={URL.createObjectURL(preview.preview)}
                                alt={`Preview of ${files[index].name}`}
                                className="w-full h-auto object-cover"
                            />
                            <p className="mt-2 text-sm text-center text-gray-700 truncate">{files[index].name}</p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={onUpload}
                    className="mt-6 w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition ease-in-out duration-200"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadDocument;
