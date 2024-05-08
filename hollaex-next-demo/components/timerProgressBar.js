import React, { useState, useEffect } from "react";
import { LinearProgress, styled } from "@mui/material";

const ProgressBarContainer = styled(LinearProgress)`
  height: 10px;
`;

const TimerProgressBar = ({ duration }) => {
  const [progress, setProgress] = useState(duration ); // Initial progress based on duration

  useEffect(() => {
    setProgress(duration);
  }, [duration]);

  return <ProgressBarContainer className="rounded-lg" variant="determinate" value={(Number(progress)*100/30000)} />;
};

export default TimerProgressBar;
