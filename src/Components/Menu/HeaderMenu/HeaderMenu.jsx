import { Row, Col } from "react-bootstrap";
import User from "../../../assets/HeaderMenu/User.png";
import Tray from "../../../assets/HeaderMenu/Tray.png";
import "./HeaderMenu.css";
import Profile from "../Profile/Profile";
import { useState } from "react";
const HeaderMenu = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const onHide = () => {
    setShow(false);
  };
  return (
    <>
      <Row className="d-flex header-menu align-items-center border-bottom border-3 shadow ">
        <Col>
          <img src={User} alt="Logo" className="icon" onClick={handleShow} />
        </Col>
        <Col xs={6} className="titleIcon text-center shadow">
          <h1 className="fs-2 fw-bold m-0 py-2 ">Menú</h1>
        </Col>
        <Col>
          <img src={Tray} alt="" className="llamado icon" />
        </Col>
      </Row>
      <Profile show={show} onHide={onHide}></Profile>
    </>
  );
};

export default HeaderMenu;
