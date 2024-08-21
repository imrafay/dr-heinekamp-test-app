import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DocumentList from './component/DocumentList/DocumentList';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <Router>
      <div>
        <ToastContainer />
        <DocumentList />
      </div>
    </Router>
  );
};

export default App;
