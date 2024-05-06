import React, { useState, useEffect } from "react";
import { LinearProgress, styled } from "@mui/material";

const ProgressBarContainer = styled(LinearProgress)`
  height: 10px;
`;

const TimerProgressBar = ({ duration, onExpire }) => {
  const [progress, setProgress] = useState(duration * 1000); // Initial progress based on duration

  useEffect(() => {
    const timerId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timerId);
          onExpire();
          return 0;
        }
        return prevProgress - 1000; // Reduce progress by 1 second each interval
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [duration, onExpire]);

  return <ProgressBarContainer variant="determinate" value={progress} />;
};

export default TimerProgressBar;
