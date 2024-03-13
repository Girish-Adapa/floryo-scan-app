// useScanDetection.js

import { useEffect, useState } from "react";

const useScanDetection = ({ onComplete }) => {
  const [detectedCode, setDetectedCode] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const code = event.key;
      if (code === "Enter") {
        onComplete(detectedCode);
        navigator.vibrate([200]); // Vibrate for 200 milliseconds when code is detected
        setDetectedCode(null); // Reset detected code
      } else {
        setDetectedCode((prevCode) => (prevCode !== null ? prevCode + code : code));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [detectedCode, onComplete]);

  return detectedCode;
};

export default useScanDetection;
