import axios from 'axios';

// Base URL for API requests (adjust if necessary)
const API_BASE_URL = 'https://localhost:7045/api/Documents';

export const getDocuments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/list`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
};

// Function to upload a document
export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error uploading document:', error);
        throw error;
    }
};

// Function to download a document
export const downloadDocumentAPI = async (documentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/download/${documentId}`, {
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        console.error('Error downloading document:', error);
        throw error;
    }
};

// Function to share a document and get a pre-signed URL
export const shareDocument = async (documentId, expiresIn) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/share`, {
            documentId,
            expiresIn,
        });
        return response.data;
    } catch (error) {
        console.error('Error sharing document:', error);
        throw error;
    }
};
