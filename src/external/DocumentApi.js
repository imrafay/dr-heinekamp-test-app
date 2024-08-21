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

export const uploadMultipleDocumentsAPI = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/upload-multiple`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading documents:', error);
        throw error;
    }
};


export const downloadMultipleDocumentsAPI = async (documentIds) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/download-multiple`, documentIds, {
            responseType: 'blob',
        });

        return response;
    } catch (error) {
        console.error('Error downloading documents:', error);
        throw error;
    }
};

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


export const deleteDocumentAPI = async (fileName) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${encodeURIComponent(fileName)}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};
