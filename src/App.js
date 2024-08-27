import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddFoto from './components/AddFoto';
import Gallery from './components/Gallery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddFoto />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
};

export default App;
