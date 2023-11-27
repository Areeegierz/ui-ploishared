import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Col,
  DatePicker,
  Form,
  Modal,
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

import { now } from "lodash";
import { useForm } from "antd/lib/form/Form";

const Index = () => {
  const [form] = useForm();
  const [listLoading, setListLoading] = useState();
  const [dataModal, setDataModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [thisStart, setThisStart] = useState();
  const [thisEnd, setThisEnd] = useState();
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
    if (
      values.enddate - values.startdate > 1 &&
      values.endtime - values.starttime === 24
    ) {
      alert("Wrong");
    }
    console.log(values);
    alert("Submit");
    axios
      .get(API_URL + `Car/Search?start=${thisStart}&end=${thisEnd}`)
      .then((res) => {
        console.log("getcar", res);
        setCar(res.data.car);
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
  useEffect(() => {
    // getData();
  }, []);

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
  return (
    <>
      <Basic slug={`ค้นหารถ`} />

      {/* {/* {JSON.stringify(thisStart)} */}

      <Row justify={"center"}>
        <Col span={24}>
          <Widget className="mt-5" title={<h3>ตัวเลือกการจองรถ</h3>}>
            <Form form={form} onFinish={onAdd} layout="vertical">
              <div className="row">
                <div className="col-md-3">
                  <Form.Item name={`startdate`} label={`วันที่จอง`}>
                    <DatePicker
                      disabledDate={(d) => !d || d.isSameOrBefore(Date(now))}
                      onChange={onChangeStartDate}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item name={`starttime`} label={`เวลาที่จอง`}>
                    <TimePicker
                      format={"HH:mm"}
                      onSelect={onChangeStartTime}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item name={`enddate`} label={`วันที่คืน`}>
                    <DatePicker
                      disabledDate={(d) => !d || d.isSameOrBefore(startDate)}
                      onChange={onChangeEndDate}
                      style={{ width: "100%" }}
                      zz
                    />
                  </Form.Item>
                </div>
                <div className="col-md-3">
                  <Form.Item name={`endtime`} label={`เวลาที่คืน`}>
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
        {car[0] ? (
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
        ) : (
          <div>
            <Skeleton active />
          </div>
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
