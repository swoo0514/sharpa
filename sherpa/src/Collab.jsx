import React from 'react';

import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import arrow from '../src/images/right-arrow.png';
import nextImg from '../src/images/next-btn.png';
import skipImg from '../src/images/skip.png';

function Collab() {
  return (
    <div className="wrap">
      <div className="last-box">
        <header>
          <div className="logo-container2 allura-regular">sherpa*</div>
        </header>
        <main>
          <div className="collab-text-container">
            <h3 className="allura-regular">
              원하는 것에 대해 제가 더 잘 이해할 수 있게
            </h3>
            <h3 className="allura-regular second">구체적으로 알려주세요.</h3>
            <div className="config-container">
              <div className="config-desc-container">
                <h3>문맥 학습</h3>
                <p>모든 내용에 대해 전부 입력하지 않아도 괜찮아요.</p>
                <p>
                  필요한 부분만, 원하는 것에 대해 생각하고 계신 만큼
                  입력해주세요.
                </p>
                <p>
                  구체적으로 설명해주시는 만큼, 더 원하는 답변을 받을 수 있어요.
                </p>
              </div>
              <div className="main-container">
                <span className="big-title">추가 지시/요청</span>
                <span className="small-title">
                  추가적으로 지시하고 싶은 사항이나, 전체적인 주제나 목표를
                  설명해주세요.
                </span>
                <span className="right-arrow-btn">
                  <img src={arrow} />
                </span>
              </div>
              <div className="main-container">
                <span className="big-title">요청 부가 설명</span>
                <span className="small-title">
                  요청에 대한 맥락을 이해할 수 있게 설명해주세요.
                  <br />
                  주제에 대한 부가적인 설명이나 배경 정보, 데이터를
                  제공해주세요.
                </span>

                <span className="right-arrow-btn">
                  <img src={arrow} />
                </span>
              </div>
              <div className="main-container">
                <span className="big-title">결과물 가이드</span>
                <span className="small-title">
                  응답받고자 하는 결과에 대한 가이드라인으로 참고할 수 있는
                  예시를 설명해주세요.
                </span>
                <span className="right-arrow-btn">
                  <img src={arrow} />
                </span>
              </div>
              <div className="main-container">
                <span className="big-title">응답 형식</span>
                <span className="small-title">
                  응답을 출력받을 구체적인 형식이나, 역할, 조건 등을
                  지정해주세요.
                </span>
                <span className="right-arrow-btn">
                  <img src={arrow} />
                </span>
              </div>
            </div>
          </div>
        </main>

        <footer>
          <div className="next-skip-container">
            <div className="next-container">
              <img src={nextImg} />
            </div>
            <div className="skip-container">
              <img src={skipImg} />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Collab;
