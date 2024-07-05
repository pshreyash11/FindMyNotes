import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Home } from './pages/Home.jsx'
import { Header } from './Components/Header.jsx'
import  About from "./pages/about.jsx"
import  Search  from './pages/Search.jsx'
import Upload from "./pages/Upload";
import Faq from "./pages/Faq.jsx"
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {

  return (
    <>
      
      <Router>
      <Header />
        <Routes >
          <Route exact path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
