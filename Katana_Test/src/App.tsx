import React, { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";

function App() {

  return (
      <Routes>
        <Route path = "/" element={<MainPage/>}/>
        <Route path = "/login" element={<LoginPage/>}/>
      </Routes>
  )
}

export default App
