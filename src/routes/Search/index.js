import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  List,
  Modal,
  Row,
  Tag,
  TimePicker,
} from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget";
import axios from "axios";
import { API_URL, BASE_URL } from "../../repositories/repository";
import Detail from "./detail";
import Link from "antd/lib/typography/Link";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { func } from "prop-types";
import Booking from "./booking";

const Index = () => {
  const [listLoading, setListLoading] = useState();
  const [dataModal, setDataModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  function bookingModal(item) {
    setDataModal(item);
    setIsModalOpen(true);
  }
  return (
    <>
      <Basic slug={`ค้นหารถ`} />
      <Row justify={"center"}>
        <Col span={24}>
          <Widget className="mt-5" title={<h3>ตัวเลือกการจองรถ</h3>}>
            <Form onFinish={onAdd} layout="vertical">
              <div className="row">
                <div className="col-md-3">
                  <Form.Item name={`startdate`} label={`วันที่ยืม`}>
                    <DatePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item name={`starttime`} label={`เวลาที่ยืม`}>
                    <TimePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item name={`enddate`} label={`วันที่คืน`}>
                    <DatePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item name={`endtime`} label={`เวลาคืน`}>
                    <TimePicker onChange={onChange} style={{ width: "100%" }} />
                  </Form.Item>
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100px" }}
                >
                  ค้นหา
                </button>
              </div>
            </Form>
          </Widget>
        </Col>
      </Row>

      <div className="row">
        {car
          ? car.map((item) => (
              <div className="col-md-4 p-3">
                <div className="card p-3" style={{ borderRadius: "22px" }}>
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <img
                        className="gx-rounded-lg"
                        src={BASE_URL + item.image}
                        width={100}
                        height={100}
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <Tag
                        className="gx-rounded-xs gx-text-uppercase"
                        color="#06BB8A"
                      >
                        {item.licensePlate}
                      </Tag>
                      <p className="gx-mb-2">{item.name}</p>

                      <u className="gx-text-primary gx-text-truncate gx-mt-sm-auto gx-mb-0 gx-pointer">
                        {/* <i
                          className={`icon icon-calenda gx-fs-xxl gx-ml-1 gx-ml-sm-2 gx-d-inline-flex gx-vertical-align-middle`}
                        /> */}
                        <i class="icon icon-calendar"></i>
                        <span
                          className="ml-3"
                          style={{ marginLeft: "10px" }}
                          onClick={() => bookingModal(item)}
                        >
                          จอง
                        </span>
                      </u>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <Modal title="แบบฟอร์มการจองรถ" open={isModalOpen} footer={false}>
        <Booking data={dataModal} />
      </Modal>
    </>
  );
};
export default Index;
