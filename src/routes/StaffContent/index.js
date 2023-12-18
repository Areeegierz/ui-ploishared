import React from "react";
import Widget from "../../components/Widget";
import { Button, Col, Row } from "antd";
import CK from "../../components/CK";

const StaffContentPage = () => {
  return (
    <>
      <h1>ปรับปรุงเนื้อหา</h1>
      <Row>
        <Col sm={24} xs={24} md={12} xl={12} lg={12}>
          <Widget title={"For Engineers"}>
            <CK />
            <Button>จัดการ</Button>
          </Widget>
        </Col>
        <Col sm={24} xs={24} md={12} xl={12} lg={12}>
          <Widget title={"For Production Team"}>
            <CK />
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col sm={24} xs={24} md={12} xl={12} lg={12}>
          <Widget title={"for Sales"}>
            <CK />
          </Widget>
        </Col>
        <Col sm={24} xs={24} md={12} xl={12} lg={12}>
          <Widget title={"For Customers"}>
            <CK />
          </Widget>
        </Col>
      </Row>
    </>
  );
};
export default StaffContentPage;
