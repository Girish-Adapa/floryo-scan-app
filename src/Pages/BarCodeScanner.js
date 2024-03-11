import { useState } from "react";
import "./BarCodeScanner.css";
import { Card, Row, Input, Button, Table, message, Modal } from "antd";
import { SearchOutlined, ScanOutlined } from "@ant-design/icons";
import Webcam from "react-webcam";
// import Quagga from "@ericblade/quagga2";

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

  const handleScanProduct = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setShowScanner(true);
    } catch (error) {
      message.error("Please provide camera permission");
    }
  };
  

  const handleCloseModal = () => {
    setShowScanner(false);
    window.location.reload();
  };

  // const startScanner = () => {
  //   Quagga.init(
  //     {
  //       inputStream: {
  //         name: "Live",
  //         type: "LiveStream",
  //         target: document.querySelector("#scanner-container"),
  //         constraints: {
  //           facingMode: "environment", // or "user" for front camera
  //         },
  //       },
  //       decoder: {
  //         readers: ["ean_reader"], // you can add more reader types here
  //       },
  //     },
  //     function (err) {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       console.log("Initialization finished. Ready to start");
  //       Quagga.start();
  //     }
  //   );

  //   Quagga.onDetected((data) => {
  //     setScannedCode(data.codeResult.code);
  //     Quagga.stop();
  //   });
  // };

  // const handleScanProduct = () => {
  //   setShowScanner(true);
  //   startScanner();
  // };

  const columns = [
    {
      title: <strong>S.No.</strong>,
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
              onClick={handleScanProduct}
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
        </Card>
      </div>
      <Modal open={showScanner} onCancel={handleCloseModal} footer={null}>
         <div>{showScanner && <Webcam style={{ width: "100%" }} />}</div>
        {/* <BarCodeScanner /> */}
        {/* <div id="scanner-container" style={{ width: "100%" }}></div>
        {scannedCode && <p>Scanned Code: {scannedCode}</p>} */}
      </Modal>
    </>
  );
};

export default BarCodeScanner;
