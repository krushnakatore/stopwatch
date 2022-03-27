import { Button } from "antd";
import SkeletonButton from "antd/lib/skeleton/Button";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);
  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div className="stopwatchWrapper">
        <span>{("0" + Math.floor((time / 600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div className="stopwatchWrapperButton">
        {!timerOn && time === 0 && (
          <Button
            onClick={() => {
              setTimerOn(true);
            }}
          >
            Start
          </Button>
        )}
        {timerOn && (
          <button
            onClick={() => {
              setTimerOn(false);
            }}
          >
            Stop
          </button>
        )}
        {!timerOn && time !== 0 && (
          <button
            onClick={() => {
              setTimerOn(true);
            }}
          >
            Resume
          </button>
        )}
        {!timerOn && time > 0 && (
          <button
            onClick={() => {
              setTime(0);
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
