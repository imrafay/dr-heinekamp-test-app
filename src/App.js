import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentList from './component/DocumentList';
import UploadDocument from './component/UploadDocument';
import DownloadDocument from './component/DownloadDocument';
import ShareDocument from './component/SharedDocument';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<DocumentList />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/download" element={<DownloadDocument />} />
          <Route path="/share" element={<ShareDocument />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
