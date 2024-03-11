import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const BarcodeReader = () => {
  const webcamRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);

  const captureFrame = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      console.log(code)

      if (code) {
        setScannedCode(code.data);
      }
    };

    img.src = imageSrc;
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: 'environment' }} // Use back camera
      />
      <button onClick={captureFrame}>Capture</button>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
    </div>
  );
};

export default BarcodeReader;
