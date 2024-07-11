import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Header } from './Components/Header.jsx';
import About from './pages/About.jsx';
import Search from './pages/Search.jsx';
import Upload from './pages/Upload';
import Faq from './pages/Faq.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserContextProvider from './context/UserContextProvider';
import PDFViewer from './pages/PDFViewer.jsx';
import { ToastContainer } from "react-toastify";
import UpdateFile from './pages/UpdateFile.jsx';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/search' element={<Search />} />
          <Route path="/showFile/:fileURL" element={<PDFViewer />} />
          <Route path="/update-file/:fileId" element={<UpdateFile />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
