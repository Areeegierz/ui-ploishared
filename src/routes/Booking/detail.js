import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, BASE_URL } from "../../repositories/repository";
import {
  Button,
  Card,
  Col,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  message,
} from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget";
import moment from "moment";
import Start from "./start";
import End from "./end";

const BookingDetail = (props) => {
  const [booking, setBooking] = useState([]);
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
    getBoooking(props.match.params.id);
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
  console.log(booking);
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
  function reSend() {
    axios.post(API_URL + `Booking/SendMail?id=${booking.id}`).then((res) => {
      message.success(`ส่งอีเมลขออนุมัติอีกครั้งสำเร็จ`);
      getBoooking(props.match.params.id);
    });
  }
  return (
    <>
      <Basic
        pre={<a href="/Booking">จัดการจอง</a>}
        slug={`รายละเอียดการจองรถ`}
      />
      <Row>
        <Col xl={8} lg={8} md={24} sm={24} xs={24}>
          <Widget>
            {car && car.image ? (
              <img src={BASE_URL + car.image} alt="" />
            ) : (
              <Skeleton.Image active />
            )}

            <hr />
            <h1>{car ? car.licensePlate : <Skeleton.Input active />}</h1>
            <p>{car ? car.name : <Skeleton.Input size="small" active />}</p>
            <p>
              ไมล์ล่าสุด{" "}
              {car ? car.mile : <Skeleton.Input size="small" active />} km
            </p>
          </Widget>
        </Col>
        <Col xl={16} lg={16} md={24} sm={24} xs={24}>
          <Widget>
            <h1>
              เลขที่ใบจองรถ :{" "}
              {booking && booking.code ? (
                booking.code
              ) : (
                <Skeleton.Input active />
              )}{" "}
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
                  {booking && booking.startDate ? (
                    moment(booking.startDate).format("DD/MM/YYYY HH:mm")
                  ) : (
                    <Skeleton.Input size="small" active />
                  )}
                </h5>
                <h5>
                  {booking && booking.startMile
                    ? "ไมล์เริ่ม : " + booking.startMile + " กม."
                    : "ไมล์เริ่ม : ยังไม่มีข้อมูล"}
                </h5>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <h5>
                  คืนรถ :
                  {booking && booking.endDate ? (
                    moment(booking.endDate).format("DD/MM/YYYY HH:mm")
                  ) : (
                    <Skeleton.Input size="small" active />
                  )}
                </h5>
                <h5>
                  {booking && booking.endMile
                    ? "ไมล์คืน : " + booking.startMile + " กม."
                    : "ไมล์คืน : ยังไม่มีข้อมูล"}
                </h5>
              </Col>
              <Col xl={8} lg={8} md={24} sm={24} xs={24}>
                <h5>
                  จุดหมาย :{" "}
                  {booking && booking.nameInThai ? (
                    booking.nameInThai
                  ) : (
                    <Skeleton.Input size="small" active />
                  )}
                </h5>
                <h5>
                  {" "}
                  {booking
                    ? "ระยะทางที่ใช้ : " +
                      (booking.endMile - booking.startMile) +
                      " กม."
                    : "ระยะทางที่ใช้ : ยังไม่มีข้อมูล"}
                </h5>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <h3>ข้อมูลผู้จองรถ</h3>
                <p>
                  ชื่อ - นามสกุล :{" "}
                  {user ? (
                    user.fullName
                  ) : (
                    <Skeleton.Input size="small" active />
                  )}
                </p>
                <p>
                  อีเมล :{" "}
                  {user ? (
                    user.username + "@scg.com"
                  ) : (
                    <Skeleton.Input size="small" active />
                  )}
                </p>
                <p>
                  เบอร์โทรศัพท์ :{" "}
                  {user ? user.phone : <Skeleton.Input size="small" active />}
                </p>
                <p>
                  Cost Center :{" "}
                  {booking ? (
                    booking.costCenter
                  ) : (
                    <Skeleton.Input size="small" active />
                  )}
                </p>
              </Col>
              <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <h3>ผู้อนุมัติ</h3>
                <p>
                  อีเมล :{" "}
                  {user ? (
                    user.approver + "@scg.com"
                  ) : (
                    <Skeleton.Input size="small" active />
                  )}
                </p>
              </Col>
            </Row>
          </Widget>
          {booking && booking.startId != 0 ? (
            <Widget>
              <h1>เลขไมล์ตอนรับรถ {booking ? booking.startMile : 0} กม.</h1>
              <br />
              <Row>
                <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                  {booking && booking.image1 ? (
                    <img src={BASE_URL + booking.image1} alt="" />
                  ) : (
                    <Skeleton.Image active />
                  )}
                </Col>
                <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                  {booking && booking.image1 ? (
                    <img src={BASE_URL + booking.image2} alt="" />
                  ) : (
                    <Skeleton.Image active />
                  )}
                </Col>
                <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                  {booking && booking.image1 ? (
                    <img src={BASE_URL + booking.image3} alt="" />
                  ) : (
                    <Skeleton.Image active />
                  )}
                </Col>
                <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                  {booking && booking.image1 ? (
                    <img src={BASE_URL + booking.image4} alt="" />
                  ) : (
                    <Skeleton.Image active />
                  )}
                </Col>
              </Row>
            </Widget>
          ) : null}
          {booking && booking.endId !== 0 ? (
            <Widget>
              <h1>
                เลขไมล์ตอนคืนรถ {booking ? booking.endMile : 0} กม. ระยะทางรวม{" "}
                {booking ? booking.endMile - booking.startMile : 0} กม.
              </h1>
              <br />
              <Row>
                <Col xl={6} lg={6} md={24} sm={24} xs={24}>
                  {booking && booking.image1 ? (
                    <img src={BASE_URL + booking.image1} alt="" />
                  ) : (
                    <Skeleton.Image active />
                  )}
                </Col>
              </Row>
            </Widget>
          ) : null}
          <Row justify={"center"}>
            {booking && booking.status === "WA" ? (
              <>
                <Button type="primary" onClick={() => reSend()}>
                  ส่งอีเมลขออนุมัติอีกครั้ง
                </Button>
                <Popconfirm
                  title={`คุณต้องการยกเลิกการจองครั้งนี้หรือไม่?`}
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    Cancel();
                  }}
                >
                  <Button type="danger">ยกเลิกการจอง</Button>
                </Popconfirm>
              </>
            ) : null}
            {booking && booking.status === "A" ? (
              <>
                {booking && booking.startId === 0 ? (
                  <>
                    <Button type="primary" onClick={showModal}>
                      รับรถ
                    </Button>

                    <Popconfirm
                      title={`คุณต้องการยกเลิกการจองครั้งนี้หรือไม่?`}
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => {
                        Cancel();
                      }}
                    >
                      <Button type="danger">ยกเลิกการจอง</Button>
                    </Popconfirm>
                  </>
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
        title="แบบฟอร์มการคืนรถ"
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
