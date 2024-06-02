import React, { useEffect, useState } from 'react';

function SlowDisplay({ text }) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!text) return; // text가 undefined인 경우에는 아무 작업도 하지 않음

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayText((prevText) => prevText + text[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100); // 100ms 간격으로 출력되도록 설정

    return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수를 방지합니다.
  }, [text]);

  return <div>{displayText}</div>;
}

export default SlowDisplay;
