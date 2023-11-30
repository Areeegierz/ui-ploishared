import { Form, Input, Button, Row, Card, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../repositories/repository";
import logo from "../../src/assets/image/ploishared-logo.png";

const sign = require("jwt-encode");

const SignIn = () => {
  const [loadings, setLoadings] = useState(false);
  const onFinish = (value) => {
    setLoadings(true);

    message.loading("กำลังเข้าสู่ระบบ");
    const obj = {
      username: value.username,
      password: value.password,
      userType: "CPAC",
    };

    axios
      .post(API_URL + `Authentication/Authentication`, obj)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          const secret = "secret";
          const jwt = sign(JSON.stringify(res.data.user), secret);
          console.log(jwt);
          localStorage.setItem("user", jwt);
          setLoadings(false);
          console.log(
            `เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${res.data.user.name}`,
            res.status
          );
          message.success(
            `เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${res.data.user.name} `,
            1.5
          );
          setTimeout(() => window.location.assign("/search"), 1000);
        } else {
          message.error(res.status);
          setLoadings(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          setLoadings(false);
          if (err.response.status === 401) {
            console.log("ข้อมูลลงชื่อเข้าใช้ไม่ถูกต้อง", err.response.status);
            message.error("ข้อมูลลงชื่อเข้าใช้ไม่ถูกต้อง");
          } else if (err.response.status === 500) {
            console.log(
              "ไม่สามารถติดต่อกับ Server ได้กรุณาตรวจสอบการเชื่อมต่อ หรือเว้นระยะทำรายการ",
              err.response.status
            );

            message.error(
              "ไม่สามารถติดต่อกับ Server ได้กรุณาตรวจสอบการเชื่อมต่อ หรือเว้นระยะทำรายการ",
              5.0
            );
          } else {
            message.error("เกิดข้อผิดพลาดที่ไม่รู้จัก");
            console.log("เกิดข้อผิดพลาดที่ไม่รู้จัก", err.response.status);
          }
          setLoadings(false);
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{
          width: "400px",
          boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
        }}
      >
        <Form.Item className="align-center">
          <Row type="flex" justify="center" align="middle">
            <img src={logo} align="middle" alt="signinlogo" width={"300px"} />
            <span>เข้าสู่ระบบด้วย ชื่อผู้ใช้งาน และ รหัสผ่านของ SCG</span>
          </Row>
        </Form.Item>
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0"
        >
          <Form.Item
            // initialValue="demo@example.com"
            rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}
            name="username"
          >
            <Input placeholder={"ชื่อผู้ใช้"} addonAfter={"@scg.com"} />
          </Form.Item>
          <Form.Item
            // initialValue="demo#123"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}
            name="password"
          >
            <Input type="password" placeholder="รหัสผ่าน" />
          </Form.Item>
          {/* <Form.Item>
                <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                <span className="gx-signup-form-forgot gx-link"><IntlMessages
                  id="appModule.termAndCondition"/></span>
              </Form.Item> */}
          <Form.Item className="align-center">
            <Row
              type="flex"
              justify="center"
              align="middle"
              className="container"
            >
              <Button
                loading={loadings}
                type="primary"
                className="gx-mb-0"
                htmlType="submit"
              >
                เข้าสู่ระบบ
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};
export default SignIn;
