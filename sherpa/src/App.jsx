import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import SearchPage from './SearchPage';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            {/* <Route path="/" element={<MainPage />} /> */}
            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
