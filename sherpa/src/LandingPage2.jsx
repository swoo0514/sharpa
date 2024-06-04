import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './App.css';
import arrow from '../src/images/arrow2.png';

function Landing2() {
  const navigate = useNavigate();
  const [Toggle, setToggle] = useState(false);
  const [Arrow, setArrow] = useState(false);

  const clickToggle = () => {
    setToggle(true);
    navigate('/land1');
  };
  const clickArrow = () => {
    setArrow(true);
    navigate('/search');
  };

  return (
    <div className="wrapper">
      <div className="last-box">
        <header>
          <div className="logo-container allura-regular text2">sherpa*</div>
        </header>

        <div className="text-container text2">
          <h3 className="allura-regular">sherpa* 가 원하는</h3>
          <h3 className="allura-regular">모든 것을 해결해드릴게요.</h3>
        </div>
        <div className="input_container in_contain2">
          <input
            className="input_box2"
            type="text"
            placeholder="요청하고자 하는 핵심내용을 먼저 입력해주세요. "
          />
          <img
            style={{ width: '30px', height: '26px' }}
            src={arrow}
            alt="arrowimg"
            onClick={clickArrow}
          />
        </div>
        <div className="toggleswitch text2">
          <span>가볍게 요청</span>
          <div className="switch_itself switch2" onClick={clickToggle}>
            <div className="switch_circle circle2"></div>
          </div>
          <span>정밀 요청</span>
        </div>
      </div>
    </div>
  );
}
export default Landing2;
