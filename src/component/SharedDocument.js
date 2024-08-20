import React, { useState } from 'react';
import { shareDocument } from '../external/DocumentApi';
import { toast } from 'react-toastify';

const ShareDocument = () => {
    const [documentId, setDocumentId] = useState('');
    const [expiresIn, setExpiresIn] = useState('1h'); // e.g., 1 hour

    const onShare = () => {
        shareDocument(documentId, expiresIn)
            .then(data => toast.success(`Shareable link created: ${data.url}`))
            .catch(error => toast.error('Error sharing file:', error));
    };

    return (
        <div>
            <h1>Share Document</h1>
            <input
                type="text"
                placeholder="Enter document ID"
                value={documentId}
                onChange={e => setDocumentId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Expires in (e.g., 1h, 1d)"
                value={expiresIn}
                onChange={e => setExpiresIn(e.target.value)}
            />
            <button onClick={onShare}>Share</button>
        </div>
    );
};

export default ShareDocument;
