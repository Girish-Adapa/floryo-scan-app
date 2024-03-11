import React, { useState } from 'react';
import Quagga from '@ericblade/quagga2';

function BarcodeScanner() {
  const [scannedCode, setScannedCode] = useState('');

  const startScanner = () => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
          facingMode: "environment" // or "user" for front camera
        },
      },
      decoder: {
        readers: ['ean_reader'] // you can add more reader types here
      }
    }, function (err) {
      if (err) {
        console.error(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      setScannedCode(data.codeResult.code);
      Quagga.stop();
    });
  };

  const handleScanProduct = () => {
    startScanner();
  };

  return (
    <div>
      <button onClick={handleScanProduct}>Scan Product</button>
      <div id="scanner-container" style={{ width: "100%" }}></div>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
    </div>
  );
}

export default BarcodeScanner;
