import { useState } from "react";
import "./BarCodeScanner.css";
import { Card, Row, Input, Button, Table, message, Modal } from "antd";
import { SearchOutlined, ScanOutlined } from "@ant-design/icons";
import Webcam from "react-webcam";
// import Quagga from "@ericblade/quagga2";

import Footer from "./Footer";

const BarCodeScanner = () => {
  // const webcamRef = useRef(null);
  const [setOrderId] = useState();
  // const [setScannedCode] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [userOrderData] = useState([
    {
      code: "CKAT01510",
      is_verified: false,
    },
    {
      code: "MDAT01520",
      is_verified: false,
    },
    {
      code: "CKAT01510",
      is_verified: true,
    },
    {
      code: "MDAT01520",
      is_verified: false,
    },
    {
      code: "CKAT01510",
      is_verified: false,
    },
    {
      code: "MDAT01520",
      is_verified: false,
    },
    {
      code: "CKAT01510",
      is_verified: true,
    },
    {
      code: "MDAT01520",
      is_verified: false,
    },
  ]);

  const fetchUserOrdersData = () => {
    // api hit and setUserOrderData
  };

  async function handleScanBarcode() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
      });
      setShowScanner(true);
      console.log(stream, "test");
    } catch (error) {
      console.error("Error accessing camera:", error);
      message.error(
        "Failed to access camera. Please provide camera permission."
      );
    }
  }

  const handleCloseModal = () => {
    setShowScanner(false);
    window.location.reload();
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
    if (data.is_verified) {
      return "row-color-verified";
    }
    return null;
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
              onChange={(e) => setOrderId(e.target.value)}
            />

            <Button
              style={{ backgroundColor: "#006b44", fontWeight: "bold" }}
              type="primary"
              icon={<SearchOutlined />}
              onClick={fetchUserOrdersData}
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
            {/* <Button >Clear All</Button> */}
          </Row>

          <Table
            columns={columns}
            dataSource={userOrderData}
            rowClassName={getRowClassName}
            pagination={false}
          />

          <Footer />
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
