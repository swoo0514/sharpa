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
          <h3 className="allura-regular">원하는 느낌에 딱 맞는 답변까지,</h3>
          <h3 className="allura-regular">sherpa* 가 이끌어 드릴게요.</h3>
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
          <div className="switch_itself switch2" onClick={clickToggle}>
            <div className="switch_circle circle2"></div>
          </div>
          <span>
            대화 내용을 기억하여 더 정밀하게 요청하고 뛰어난 답변을 받을 수
            있어요.
          </span>
        </div>
      </div>
    </div>
  );
}
export default Landing2;
