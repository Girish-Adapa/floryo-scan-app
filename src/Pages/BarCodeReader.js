import React, { useState } from "react";
import "./BarCodeScanner.css";
import { Card, Row, Input, Button, Table, Modal } from "antd";
import { SearchOutlined, ScanOutlined } from "@ant-design/icons";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarCodeScanner = () => {
  const [orderId, setOrderId] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [userOrderData] = useState([]);
  const [loading] = useState(false);
  const [data, setData] = useState();
  const [stopStream, setStopStream] = useState(false);

  const handleScanBarcode = () => {
    setShowScanner(true);
  };

  const handleCloseModal = () => {
    setShowScanner(false);
  };

  const fetchUserOrdersData = () => {
    // Implement your logic for fetching user orders data
  };

  const vibratePhone = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200]);
    } else {
      console.log("Vibration not supported");
    }
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
          {data && <h1>{data}</h1>}
          <Table
            columns={columns}
            dataSource={userOrderData}
            rowClassName={getRowClassName}
            pagination={false}
          />
        </Card>
      </div>
      <Modal
        open={showScanner}
        onCancel={handleCloseModal}
        closable={false}
        footer={null}
        width={300}
      >
        <div id="scanner-container" style={{ width: "100%", height: "100%" }}>
          {/* <Webcam
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
          /> */}
          <BarcodeScannerComponent
            // width={200}
            // height={500}
            stopStream={stopStream}
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text);
                setStopStream(true);
                vibratePhone();
              } else {
                setData("Not Found");
              }
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default BarCodeScanner;
