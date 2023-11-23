import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  List,
  Row,
  TimePicker,
} from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget";
import axios from "axios";
import { API_URL, BASE_URL } from "../../repositories/repository";
import Detail from "./detail";
import Link from "antd/lib/typography/Link";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Index = () => {
  const [listLoading, setListLoading] = useState();
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onAdd = (values) => {
    console.log(values);
    axios.get(API_URL + "Car/Get").then((res) => {
      console.log("getcar", res);
    });
  };
  const [car, setCar] = useState([]);
  const getData = () => {
    setListLoading(true);
    axios.get(API_URL + `Car/Get`).then((res) => {
      setCar(res.data.car);
      setListLoading(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Basic slug={`ค้นหารถ`} />
      <Row justify={"center"}>
        <Col lg={8} xl={8} md={24} xs={24} sm={24}>
          <Widget className="mt-5" title={<h3>ตัวเลือกการจองรถ</h3>}>
            <Form onFinish={onAdd} layout="vertical">
              <Row>
                <Col span={12}>
                  {" "}
                  <Form.Item name={`startdate`} label={`วัน-เวลา ที่ยืม`}>
                    <DatePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {" "}
                  <Form.Item name={`starttime`}>
                    <TimePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  {" "}
                  <Form.Item name={`enddate`} label={`วัน-เวลา ที่คืน`}>
                    <DatePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {" "}
                  <Form.Item name={`endtime`}>
                    <TimePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify={"center"}>
                <Button type="primary" htmlType="submit">
                  ค้นหา
                </Button>
              </Row>
            </Form>
          </Widget>
        </Col>
      </Row>
      <List
        loading={listLoading}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={car}
        renderItem={(item) => (
          <List.Item>
            <Widget title={item.licensePlate}>
              <Link href={`/SearchDetail/${item.id}`} as={`/SearchDetail/[id]`}>
                <Button>จอง</Button>
              </Link>
              <Image alt={"car"} src={BASE_URL + item.image} />
              {item.name}
            </Widget>
          </List.Item>
        )}
      />
    </>
  );
};
export default Index;
