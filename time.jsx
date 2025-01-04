jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(sessionLength * 60);
    setTimerLabel('Session');
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft(sessionLength * 60 - 1);
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(sessionLength * 60 + 1);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div id="clock" className="container text-center">
      <h1>Pomodoro Clock</h1>
      <div className="row">
        <div className="col-md-6">
          <h2 id="break-label">Break Length</h2>
          <div className="btn-group">
            <button id="break-decrement" className="btn btn-primary" onClick={handleBreakDecrement}>
              -
            </button>
            <button id="break-length" className="btn btn-light">
              {breakLength}
            </button>
            <button id="break-increment" className="btn btn-primary" onClick={handleBreakIncrement}>
              +
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <h2 id="session-label">Session Length</h2>
          <div className="btn-group">
            <button id="session-decrement" className="btn btn-primary" onClick={handleSessionDecrement}>
              -
            </button>
            <button id="session-length" className="btn btn-light">
              {sessionLength}
            </button>
            <button id="session-increment" className="btn btn-primary" onClick={handleSessionIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
      <h2 id="timer-label">{timerLabel}</h2>
      <h1 id="time-left">{formatTime(timeLeft)}</h1>
      <div className="btn-group">
        <button id="start_stop" className="btn btn-primary" onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button id="reset" className="btn btn-danger" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio id="beep" src="(link unavailable)" />
    </div>
  );
}

export default App;
