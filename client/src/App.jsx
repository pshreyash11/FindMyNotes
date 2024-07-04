import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Home } from './pages/Home.jsx'
import { Header } from './Components/Header.jsx'
import  About from "./pages/about.jsx"
import  Search  from './pages/Search.jsx'

function App() {

  return (
    <>
      
      <Router>
      <Header />
        <Routes >
          <Route exact path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          {/* <Route path='/faq' element={<Home/>}/>
          <Route path='/profile' element={<Home/>}/>
          <Route path='/login' element={<Home/>}/>
          <Route path='/register' element={<Home/>}/>
          <Route path='/upload' element={<Home/>}/> */}
          <Route path='/search' element={<Search/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
