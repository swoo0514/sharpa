import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LandingPage() {
  const navigate = useNavigate();

  function onClick() {
    navigate('/login');
  }
  return (
    <div className="last-box">
      <header>
        <div className="logo-container allura-regular">sherpa*</div>
      </header>
      <main>
        <div className="text-container">
          <h3 className="allura-regular">느낌만 있어도 좋아요</h3>
          <h3 className="allura-regular">
            sherpa*가 원하는 곳까지 이끌어드릴게요.
          </h3>
        </div>
        <div className="btn-container">
          <button className="start-btn" onClick={onClick}></button>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default LandingPage;
