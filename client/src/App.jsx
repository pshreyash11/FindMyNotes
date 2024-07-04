import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { Home } from './pages/Home.jsx'
import { Header } from './Components/Header.jsx'

function App() {

  return (
    <>
      
      <Router>
      <Header />
        <Routes >
          <Route exact path='/' element={<Home/>}/>
          {/* <Route path='/about' element={<Home/>}/>
          <Route path='/faq' element={<Home/>}/>
          <Route path='/profile' element={<Home/>}/>
          <Route path='/login' element={<Home/>}/>
          <Route path='/register' element={<Home/>}/>
          <Route path='/upload' element={<Home/>}/>
          <Route path='/search' element={<Home/>}/> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
