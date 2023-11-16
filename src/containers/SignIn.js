import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn,
} from "../appRedux/actions";

import IntlMessages from "util/IntlMessages";
import CircularProgress from "../components/CircularProgress";
import TwitterOutlined from "@ant-design/icons/lib/icons/TwitterOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import FacebookOutlined from "@ant-design/icons/lib/icons/FacebookOutlined";
import GoogleOutlined from "@ant-design/icons/lib/icons/GoogleOutlined";
import axios from "axios";
import { API_URL } from "../repository/repository";

const SignIn = () => {
  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser } = useSelector(
    ({ auth }) => auth
  );
  const history = useHistory();

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    if (authUser !== null) {
      history.push("/");
    }
  });

  const onFinishFailed = (errorInfo) => {};

  const onFinish = (values) => {
    var context = {
      username: values.username,
      password: values.password,
      userType: "CPAC",
    };
    axios
      .post(API_URL + `/Authentication/Authentication`, context)
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        message.success(`เข้าสู่ระบบสำเร็จ`);
        setTimeout(() => window.location.assign("/"), 1000);
      });
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="gx-app-login-wrap contrainer">
      <Row justify={"center"} align={"middle"}>
        <Col lg={6} xl={6} md={24} xs={24} sm={24}>
          <Card>
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0"
            >
              <Row justify={"center"} className="mb-5">
                <img
                  src={"/assets/images/landscape-logo.5445c605292f30db26ae.png"}
                />
              </Row>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "The input is not valid E-mail!",
                  },
                ]}
                name="username"
              >
                <Input addonAfter="@SCG.com" placeholder="Username" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                name="password"
              >
                <Input.Password placeholder="password" />
              </Form.Item>

              {/* <Form.Item>
                <Checkbox>
                  <IntlMessages id="appModule.iAccept" />
                </Checkbox>
                <span className="gx-signup-form-forgot gx-link">
                  <IntlMessages id="appModule.termAndCondition" />
                </span>
              </Form.Item> */}
              <Row justify={"center"}>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  เข้าสูระบบ
                </Button>
              </Row>
            </Form>
            {loader ? (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            ) : null}
            {showMessage ? message.error(alertMessage.toString()) : null}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
