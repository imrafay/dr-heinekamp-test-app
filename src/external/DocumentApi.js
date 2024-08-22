import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getDocuments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/documents/list`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const uploadMultipleDocumentsAPI = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/documents/upload-multiple`, formData, {
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
        const response = await axios.post(`${API_BASE_URL}/documents/download-multiple`, documentIds, {
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
        const response = await axios.get(`${API_BASE_URL}/documents/download/${documentId}`, {
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
        const response = await axios.delete(`${API_BASE_URL}/documents/delete/${encodeURIComponent(fileName)}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};
