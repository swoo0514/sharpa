import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      navigate('/land1');
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <div>
      <header>
        <div className="logo-container allura-regular text-color">sherpa*</div>
      </header>
      <main className="login-main">
        <div className="text-container2">
          <h3 className="allura-regular text-color">느낌만 있어도 좋아요</h3>
          <h3 className="allura-regular text-color">
            sharpa*가 원하는 곳까지 이끌어드릴게요.
          </h3>
        </div>
        <div className="content-box">
          <div className="login-container">
            <div className="local-login">
              <div className="local-desc text-color">
                이메일을 입력하여 바로 경험해보세요.
              </div>
              <form className="local-container" onSubmit={handleSubmit}>
                <div className="for-border">
                  <input
                    type="email"
                    className="local-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsEmailValid(true);
                    }}
                    style={{ borderColor: isEmailValid ? '' : 'red' }}
                  />
                </div>
                {!isEmailValid && (
                  <div style={{ color: 'red' }}>
                    유효한 이메일을 입력해주세요.
                  </div>
                )}
              </form>
            </div>
            <div className="social-login">
              <div className="social-desc text-color">소셜미디어로 로그인</div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default LoginPage;
