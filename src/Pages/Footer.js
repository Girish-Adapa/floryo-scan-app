import { Row } from "antd";
import {
  InstagramOutlined,
  WhatsAppOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const phoneNumber = "9440987902";
  const message = encodeURIComponent("Hello Girish...!");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  const profileUsername = "girish_._._._";
  const instagramLink = `https://www.instagram.com/${profileUsername}`;

  const linkedInProfile =
    "https://www.linkedin.com/in/girish-sai-a-2626121b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";

  return (
    <>
      <Row
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#fdb823",
          padding: "10px",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        Developed by Girish-Sai-Adapa. For more information,
        contact&nbsp;:&nbsp;
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <WhatsAppOutlined
            style={{
              color: "green",
              marginRight: "8px",
            }}
          />
        </a>
        <a href={instagramLink} target="_blank" rel="noopener noreferrer">
          <InstagramOutlined
            style={{
              color: "#E1306C",
              marginRight: "8px",
            }}
          />
        </a>
        <a href={linkedInProfile} target="_blank" rel="noopener noreferrer">
          <LinkedinOutlined style={{ color: "#0077B5", marginRight: "8px" }} />
        </a>
        <span>
          Copyright @2024 <b>Floryo</b>. All rights reserved
        </span>
      </Row>
    </>
  );
};

export default Footer;
