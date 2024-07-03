import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom';

import SignIn from './components/singinAndSingup/singin.component';

function App() {

  return (
    <>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>

  );
}

export default App
