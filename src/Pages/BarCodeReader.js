import React, { useState } from "react";
import "./BarCodeScanner.css";
import { Card, Row, Input, Button, Table, message, Modal } from "antd";
import { SearchOutlined, ScanOutlined } from "@ant-design/icons";
import Webcam from "react-webcam";
import Quagga from "quagga";

const BarCodeScanner = () => {
  const [orderId, setOrderId] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [userOrderData, setUserOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserOrdersData = () => {
    setLoading(true);
    // Perform API call to fetch user orders based on orderId
    // Example:
    // fetch(`/api/orders?orderId=${orderId}`)
    //   .then(response => response.json())
    //   .then(data => setUserOrderData(data))
    //   .catch(error => console.error("Error fetching data:", error))
    //   .finally(() => setLoading(false));
  };

  async function handleScanBarcode() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });
      setShowScanner(true);
      test(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
      message.error("Failed to access camera. Please provide camera permission.");
    }
  }

  const test = (stream) => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            facingMode: "environment",
            aspectRatio: { min: 1, max: 2 },
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader", "code_128_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error("Failed to initialize Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      const code = data.codeResult.code;
      console.log("Barcode detected:", code);
      // You can add code here to store the barcode data
      handleCloseModal();
    });

    return () => {
      Quagga.stop();
    };
  };

  const handleCloseModal = () => {
    setShowScanner(false);
  };

  const columns = [
    {
      title: <strong>S.No</strong>,
      align: "center",
      render: (text, data, index) => index + 1,
    },
    {
      title: <strong>Product ID</strong>,
      align: "center",
      render: (data) => <span>{data?.code}</span>,
    },
  ];

  const getRowClassName = (data) => {
    return data.is_verified ? "row-color-verified" : null;
  };

  return (
    <>
      <div className="container">
        <Card className="card-container">
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#006b44",
              color: "white",
            }}
          >
            Floryo Order Verify Scan
          </h2>
          <Row
            style={{
              margin: "50px 0px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Input
              style={{ width: "50%", textTransform: "uppercase" }}
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />

            <Button
              style={{ backgroundColor: "#006b44", fontWeight: "bold" }}
              type="primary"
              icon={<SearchOutlined />}
              onClick={fetchUserOrdersData}
              loading={loading}
            >
              Search
            </Button>
          </Row>
          <Row style={{ margin: "50px", justifyContent: "space-around" }}>
            <Button
              style={{ backgroundColor: "#006b44", fontWeight: "bold" }}
              type="primary"
              icon={<ScanOutlined />}
              onClick={handleScanBarcode}
            >
              Scan Product
            </Button>
          </Row>

          <Table
            columns={columns}
            dataSource={userOrderData}
            rowClassName={getRowClassName}
            pagination={false}
          />
        </Card>
      </div>
      <Modal
        visible={showScanner}
        onCancel={handleCloseModal}
        closable={false}
        footer={null}
        width={300}
      >
        <div id="scanner-container" style={{ width: "100%", height: "100%" }}>
          <Webcam
            audio={false}
            videoConstraints={{
              facingMode: "environment",
              aspectRatio: 2.25 / 1,
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              maxHeight: "150px",
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default BarCodeScanner;
