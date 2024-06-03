import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LandingPage() {
  const navigate = useNavigate();

  function onClick() {
    navigate('/login');
  }
  return (
    <div>
      <header>
        <div className="logo-container">
          <img src="" alt="logo" />
        </div>
      </header>
      <main>
        <div className="text-container">
          <h3>느낌만 있어도 좋아요</h3>
          <h3>sharpa*가 원하는 곳까지 이끌어드릴게요.</h3>
        </div>
        <div className="btn-container">
          <button className="start-btn" onClick={onClick}>
            시작하기
          </button>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default LandingPage;
