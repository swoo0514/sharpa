import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './App.css';
import arrow from '../src/images/arrow2.png';

function Landing1() {
  const navigate = useNavigate();
  const [Toggle, setToggle] = useState(false);
  const [Arrow, setArrow] = useState(false);

  const clickToggle = () => {
    setToggle(true);
    navigate('/land2');
  };
  const clickArrow = () => {
    setArrow(true);
    navigate('/search');
  };

  return (
    <div className="last-box">
      <header>
        <div className="logo-container allura-regular">sherpa*</div>
      </header>

      <div className="text-container">
        <h3 className="allura-regular">필요한 내용만 하나하나 바로,</h3>
        <h3 className="allura-regular">
          가볍고 빠르게 sherpa* 에게 질문해보세요.
        </h3>
      </div>
      <div className="input_container">
        <input
          className="inputbox"
          type="text"
          placeholder="무엇이든 물어보거나 요청해주세요"
        />
        <img
          style={{ width: '30px', height: '26px' }}
          src={arrow}
          alt="arrowimg"
          onClick={clickArrow}
        />
      </div>
      <div className="toggleswitch">
        <span>가볍게 요청</span>
        <div className="switch_itself" onClick={clickToggle}>
          <div className="switch_circle"></div>
        </div>
        <span>정밀 요청</span>
      </div>
    </div>
  );
}
export default Landing1;
