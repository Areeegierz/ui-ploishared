import React, { useState } from "react";

import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  Modal,
  Result,
  Row,
  Skeleton,
  Tag,
  TimePicker,
} from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget";
import axios from "axios";
import { API_URL, BASE_URL } from "../../repositories/repository";

import Booking from "./booking";
import moment from "moment";
import { FieldTimeOutlined, SmileOutlined } from "@ant-design/icons";
import { now } from "lodash";
import { useForm } from "antd/lib/form/Form";

const Index = () => {
  const [form] = useForm();

  const [dataModal, setDataModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [thisStart, setThisStart] = useState();
  const [thisEnd, setThisEnd] = useState();
  const [car, setCar] = useState([]);
  const [carList, setCarList] = useState(false);
  const [search, setSearch] = useState(false);
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
    console.log(thisStart);
    console.log(thisEnd);
    axios
      .get(API_URL + `Car/Search?start=${thisStart}&end=${thisEnd}`)
      .then((res) => {
        console.log(res);
        setSearch(true);
        setCar(res.data.car);
        setCarList(true);
      });
  };

  const disabledHours = () => {
    const hours = [];
    const currentHour = startTime.split(":")[0];

    for (let i = currentHour; i >= 0; i--) {
      hours.push(i);
    }

    return hours;
  };
  const disabledMinutes = (selectedHour) => {
    const minutes = [];
    const currentMinute = startTime.split(":")[1];
    if (selectedHour === moment().hour()) {
      for (let i = currentMinute; i >= 0; i--) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  function bookingModal(item) {
    setDataModal(item);
    setIsModalOpen(true);
  }
  const onChangeStartDate = (e) => {
    console.log(e);
    console.log(moment(e).format("YYYY-MM-DD"));
    setStartDate(moment(e).format("YYYY-MM-DD"));
    if (e && startTime) {
      setThisStart(moment(e).format("YYYY-MM-DD") + " " + startTime);
      console.log(
        "start : " + moment(e).format("YYYY-MM-DD") + " " + startTime
      );
    }
  };
  const onChangeStartTime = (e) => {
    console.log("e", e);

    console.log(moment(e).format("HH:mm:ss"));

    setStartTime(moment(e).format("HH:mm:ss"));
    if (e && startDate) {
      setThisStart(startDate + " " + moment(e).format("HH:mm:ss"));
      console.log("start : " + startDate + " " + moment(e).format("HH:mm:ss"));
    }
    setEndTime(moment(e).format("HH:mm:ss"));
    form.setFieldsValue({ endtime: e });
  };
  const onChangeEndDate = (e) => {
    console.log(e);
    console.log(moment(e).format("YYYY-MM-DD"));

    setEndDate(moment(e).format("YYYY-MM-DD"));
    if (e && endTime) {
      setThisEnd(moment(e).format("YYYY-MM-DD") + " " + endTime);
      console.log("End : " + moment(e).format("YYYY-MM-DD") + " " + endTime);
    }
  };
  const onChangeEndTime = (e) => {
    console.log(e);
    console.log(moment(e).format("HH:mm:ss"));

    setEndTime(moment(e).format("HH:mm:ss"));
    if (e && endDate) {
      setThisEnd(endDate + " " + moment(e).format("HH:mm:ss"));
      console.log("start : " + endDate + " " + moment(e).format("HH:mm:ss"));
    }
  };
  const resetSearch = () => {
    form.resetFields();
    setSearch(false);
  };
  return (
    <>
      <Basic slug={`ค้นหารถ`} />

      <Row justify={"center"}>
        <Col span={24}>
          <Widget className="mt-5" title={<h3>ตัวเลือกการจองรถ</h3>}>
            <Form form={form} onFinish={onAdd} layout="vertical">
              <div className="row">
                <div className="col-md-3">
                  <Form.Item
                    name={`startdate`}
                    label={`วันที่จอง`}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      format={"DD/MM/YYYY"}
                      disabledDate={(d) => !d || d.isSameOrBefore(Date(now))}
                      onChange={onChangeStartDate}
                      style={{ width: "100%" }}
                      inputReadOnly
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item
                    name={`starttime`}
                    label={`เวลาที่จอง`}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TimePicker
                      format={"HH:mm"}
                      onSelect={onChangeStartTime}
                      style={{ width: "100%" }}
                      inputReadOnly
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item
                    name={`enddate`}
                    label={`วันที่คืน`}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      format={"DD/MM/YYYY"}
                      disabledDate={(d) => !d || d.isSameOrBefore(startDate)}
                      onChange={onChangeEndDate}
                      style={{ width: "100%" }}
                      inputReadOnly
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item
                    name={`endtime`}
                    label={`เวลาที่คืน`}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TimePicker
                      disabledHours={
                        startDate === endDate ? disabledHours : null
                      }
                      disabledMinutes={
                        startDate === endDate ? disabledMinutes : null
                      }
                      format={"HH:mm"}
                      onChange={onChangeEndTime}
                      style={{ width: "100%" }}
                      inputReadOnly
                    />
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
        {car.length > 0 && search === true ? (
          car.map((item) => (
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
        ) : car.length <= 0 && search === false ? (
          <Result
            status="warning"
            icon={<FieldTimeOutlined />}
            title="ยังไม่ได้เลือกวันและเวลาที่ต้องการจอง"
          />
        ) : (
          <Result
            status="error"
            icon={<FieldTimeOutlined />}
            title="ไม่มีรถว่างให้จอง ในช่วงเวลานี้"
            extra={<Button onClick={() => resetSearch()}>เลือกเวลาใหม่</Button>}
          />
        )}
      </div>
      <Modal
        title="แบบฟอร์มการจองรถ"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <Booking data={dataModal} start={thisStart} end={thisEnd} />
      </Modal>
    </>
  );
};
export default Index;
