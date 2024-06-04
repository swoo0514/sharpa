import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './App.css';
import arrow from '../src/images/arrow2.png';

import App, { AppContext } from './App';

function Landing1() {
  //Data를 다른 페이지로 넘기기 위한 장치 o
  const { setShareData } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setShareData(inputValue);
    navigate('/search');
  };
  //here
  const navigate = useNavigate();
  const [Toggle, setToggle] = useState(false);
  // const [Arrow, setArrow] = useState(false);

  const clickToggle = () => {
    setToggle(true);
    navigate('/land2');
  };
  // const clickArrow = () => {
  //   setArrow(true);
  //   navigate('/search');
  // };

  return (
    <div className="last-box">
      <header>
        <div className="logo-container allura-regular">sherpa*</div>
      </header>

      <div className="text-container text1">
        <h3 className="allura-regular">필요한 내용만 하나씩 바로바로,</h3>
        <h3 className="allura-regular">
          가볍고 빠르게 sherpa* 에게 질문해보세요.
        </h3>
      </div>
      <div className="input_container">
        <input
          className="inputbox"
          type="text"
          placeholder="무엇이든 물어보거나 요청해주세요"
          //here
          value={inputValue}
          onChange={handleInputChange}
        />
        <img
          style={{ width: '30px', height: '26px' }}
          src={arrow}
          alt="arrowimg"
          onClick={handleSubmit}
        />
      </div>
      <div className="toggleswitch">
        <div className="switch_itself" onClick={clickToggle}>
          <div className="switch_circle"></div>
        </div>
        <span>대화 내용을 기억하지 않아 가볍게 요청할 수 있어요.</span>
      </div>
    </div>
  );
}
export default Landing1;
