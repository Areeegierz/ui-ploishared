import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, BASE_URL } from "../../repositories/repository";
import { Button, Card, Col, Modal, Row, message } from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget";
import moment from "moment";
import Start from "./start";
import End from "./end";

const BookingDetail = (props) => {
  const [booking, setBooking] = useState();
  const [car, setCar] = useState();
  const [user, setUser] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEndlOpen, setIsEndOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const endModal = () => {
    setIsEndOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setIsEndOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEndOpen(false);
  };

  useEffect(() => {
    if (props.match.params.id) {
      getBoooking(props.match.params.id);
    }
  }, [props]);

  function getBoooking(id) {
    axios.get(API_URL + `Booking/GetById?id=${id}`).then((res) => {
      setBooking(res.data.booking);
      getCar(res.data.booking.carId);
      getUser(res.data.booking.createBy);
    });
  }
  function getCar(id) {
    axios.get(API_URL + `Car/GetById?id=${id}`).then((res) => {
      setCar(res.data.car);
    });
  }
  function getUser(id) {
    axios.get(API_URL + `User/GetById?id=${id}`).then((res) => {
      setUser(res.data.user);
    });
  }

  function Cancel() {
    axios.get(API_URL + `Booking/Cancel?id=${booking.id}`).then((res) => {
      message.success(`ยกเลิกการจองเรียบร้อย`);
      getBoooking(props.match.params.id);
    });
  }
  return (
    <>
      {/* {JSON.stringify(props.match.params.id)} */}
      {/* {JSON.stringify(booking)} */}
      {/* {JSON.stringify(car)} */}
      {/* {JSON.stringify(user)} */}
      <Basic slug={`รายละเอียดการจองรถ`} />
      <Row>
        <Col xl={8} lg={8} md={24} sm={24} xs={24}>
          <Widget>
            <img src={car ? BASE_URL + car.image : null} />
            <hr />
            <h1>{car ? car.licensePlate : null}</h1>
            <p>{car ? car.name : null}</p>
            <p>ไมล์ล่าสุด {car ? car.mile : 0} km</p>
          </Widget>
        </Col>
        <Col xl={16} lg={16} md={24} sm={24} xs={24}>
          <Widget>
            <h1>
              เลขที่ใบจองรถ : {booking ? booking.code : "ผิดผลาด"}{" "}
              {booking && booking.status === "C" ? (
                <u style={{ color: "red" }}>ยกเลิก</u>
              ) : null}
              {booking && booking.status === "WA" ? (
                <u style={{ color: "grey" }}>รออนุมัติ</u>
              ) : null}
              {booking && booking.status === "A" ? (
                <u style={{ color: "green" }}>อนุมัติ</u>
              ) : null}
              {booking && booking.status === "S" ? (
                <u style={{ color: "blue" }}>เสร็จสิ้น</u>
              ) : null}
            </h1>
            <Row>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <h5>
                  รับรถ :{" "}
                  {booking
                    ? moment(booking.startDate).format("DD/MM/YYYY HH:mm")
                    : "ผิดผลาด"}
                </h5>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <h5>
                  คืนรถ :{" "}
                  {booking
                    ? moment(booking.endDate).format("DD/MM/YYYY HH:mm")
                    : "ผิดผลาด"}
                </h5>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <h5>จุดหมาย : {booking ? booking.provinceName : "ผิดผลาด"}</h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <h3>ข้อมูลผู้จองรถ</h3>
                <p>ชื่อ - นามสกุล : {user ? user.fullName : "ผิดผลาด"}</p>
                <p>อีเมล : {user ? user.username + "@scg.com" : "ผิดผลาด"}</p>
                <p>เบอร์โทรศัพท์ : {user ? user.phone : "ผิดผลาด"}</p>
                <p>Cost Center : {booking ? booking.costCenter : "ผิดผลาด"}</p>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <h3>ผู้อนุมัติ</h3>
                <p>อีเมล : {user ? user.approver + "@scg.com" : "ผิดผลาด"}</p>
              </Col>
            </Row>
          </Widget>
          <Widget>
            <h1>เลขไมล์ตอนรับรถ {booking ? booking.startMile : 0} KM</h1>
            <br />
            <Row>
              <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                <img src={BASE_URL + (booking ? booking.image1 : 0)} />
              </Col>
              <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                <img src={BASE_URL + (booking ? booking.image2 : 0)} />
              </Col>
              <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                <img src={BASE_URL + (booking ? booking.image3 : 0)} />
              </Col>
              <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                <img src={BASE_URL + (booking ? booking.image4 : 0)} />
              </Col>
            </Row>
          </Widget>
          <Widget>
            <h1>
              เลขไมล์ตอนรับรถ {booking ? booking.endMile : 0} KM, ระยะทางรวม{" "}
              {booking ? booking.endMile - booking.startMile : 0} KM
            </h1>
            <br />
            <Row>
              <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                <img src={BASE_URL + (booking ? booking.image : 0)} />
              </Col>
            </Row>
          </Widget>
          <Row justify={"center"}>
            {booking && booking.status === "WA" ? (
              <>
                <Button type="primary">ส่งอีเมลขออนุมัติ</Button>
                <Button type="danger" onClick={() => Cancel()}>
                  ยกเลิก
                </Button>
              </>
            ) : null}
            {booking && booking.status === "A" ? (
              <>
                {booking && booking.startId === 0 ? (
                  <Button type="primary" onClick={showModal}>
                    รับรถ
                  </Button>
                ) : (
                  <Button type="primary" onClick={endModal}>
                    คืนรถ
                  </Button>
                )}
              </>
            ) : null}
          </Row>
        </Col>
      </Row>

      <Modal
        title="แบบฟอร์มการรับรถ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // width={1000}
        footer={false}
      >
        <Start booking={booking} />
      </Modal>
      <Modal
        title="แบบฟอร์มการรับรถ"
        open={isEndlOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // width={1000}
        footer={false}
      >
        <End booking={booking} />
      </Modal>
    </>
  );
};
export default BookingDetail;
