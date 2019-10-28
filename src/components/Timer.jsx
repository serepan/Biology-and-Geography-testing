import React, { useEffect } from 'react';

const Timer = (props) => {

  const {isActive, setIsActive, seconds, setSeconds} = props;

  const start = () => {
      setIsActive(!isActive);
  }

  const reset = () => {
      setSeconds(20);
      setIsActive(!isActive);
  }

  useEffect(() => {
      let interval = null;
      if (isActive) {
          interval = setInterval(() => {
              setSeconds((seconds) => {
                  if (seconds > 0) { return --seconds }
              });
          }, 1000);
      } else if (!isActive && seconds !== 0) {
          clearInterval(interval);
      }
      return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="booksList col-lg-6">
      <h1>Предлагаем Вам пройти небольшой тест на знание простейших вопросов по всякой всячине. На всё-провсё дается 120 секунд</h1>
      <h2>{seconds}</h2>

      {!isActive && <button className="btn btn-primary" onClick={start}>Start</button>}

      {isActive && <button className="btn btn-secondary" onClick={reset}>Reset</button>}
    </div>
  )
}

export default Timer;