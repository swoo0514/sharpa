import React, { createContext } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import SearchPage from './SearchPage';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import Landing1 from './LandingPage1';
import Landing2 from './LandingPage2';

export const AppContext = createContext();
//here
function App() {
  const [shareData, setShareData] = useState('');
  return (
    <>
      <div>
        <AppContext.Provider value={{ shareData, setShareData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/land1" element={<Landing1 />} />
              <Route path="land2" element={<Landing2 />} />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </div>
    </>
  );
}
export default App;
