import { useEffect, useState } from "react";
import Basic from "../../../components/navigation/Breadcrumb/Basic";
import axios from "axios";
import { API_URL, BASE_URL } from "../../../repositories/repository";
import { Card, Col, Row, Skeleton, Spin, Timeline } from "antd";
import Widget from "../../../components/Widget";
import moment from "moment";
import Link from "antd/lib/typography/Link";

const Detail = (props) => {
  const [car, setCar] = useState();
  const [progress, setProgress] = useState();
  const [canceled, setCanceled] = useState();
  const [success, setSuccess] = useState();
  const [total, setTotal] = useState();
  const [history, setHistory] = useState();
  useEffect(() => {
    if (props.match.params.id) {
      getCarById(props.match.params.id);
      getOverviewById(props.match.params.id);
      getHistory(props.match.params.id);
    }
  }, [props]);
  function getCarById(id) {
    axios.get(API_URL + `Car/GetById?id=${id}`).then((res) => {
      setCar(res.data.car);
    });
  }
  function getOverviewById(id) {
    axios.get(API_URL + `Booking/Overview?id=${id}`).then((res) => {
      console.log(res);
      setProgress(res.data.acc);
      setCanceled(res.data.cancel);
      setSuccess(res.data.success);
      setTotal(res.data.total);
    });
  }
  function getHistory(id) {
    axios.get(API_URL + `Booking/History?id=${id}`).then((res) => {
      console.log(res);
      setHistory(res.data.booking);
    });
  }
  function getColor(status) {
    if (status == "S") {
      return "green";
    }
    if (status == "A") {
      return "blue";
    }
    if (status == "WA") {
      return "grey";
    }
    if (status == "C") {
      return "red";
    }
  }
  return (
    <>
      <Basic
        pre={<a href="/car">จัดการรถ</a>}
        slug={`รายละเอียดรถป้ายทะเบียน ${car ? car.licensePlate : "Retieving"}`}
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
          <Row>
            <Col xl={6} lg={6} md={24} sm={24} xs={24}>
              <Widget title={<h2>ดำเนินการ</h2>}>
                <div className="text-center">
                  <h5>{progress ? progress : <Spin />} ครั้ง</h5>
                </div>
              </Widget>
            </Col>
            <Col xl={6} lg={6} md={24} sm={24} xs={24}>
              <Widget title={<h2>สำเร็จ</h2>}>
                <div className="text-center">
                  <h5>{success ? success : <Spin />} ครั้ง</h5>
                </div>
              </Widget>
            </Col>
            <Col xl={6} lg={6} md={24} sm={24} xs={24}>
              <Widget title={<h2>ยกเลิก</h2>}>
                <div className="text-center">
                  <h5>{canceled ? canceled : <Spin />} ครั้ง</h5>
                </div>
              </Widget>
            </Col>
            <Col xl={6} lg={6} md={24} sm={24} xs={24}>
              <Widget title={<h2>ทั้งหมด</h2>}>
                <div className="text-center">
                  <h5>{total ? total : <Spin />} ครั้ง</h5>
                </div>
              </Widget>
            </Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card
                title="ประวัติการจองรถ"
                className="gx-card"
                style={{ height: "400px" }}
              >
                <Timeline>
                  {history ? (
                    <>
                      {history.map((item) => (
                        <Timeline.Item color={getColor(item.status)}>
                          <Link
                            href={`/booking/${item.id}`}
                            as={`/booking/[id]`}
                          >
                            <u>
                              จองรถวันที่{" "}
                              {moment(item.startDate).format(
                                "DD/MM/YYYY HH/mm"
                              ) +
                                " - " +
                                moment(item.endDate).format(
                                  "DD/MM/YYYY HH/mm"
                                )}{" "}
                              จุดหมาย {item.nameInThai}
                            </u>
                          </Link>
                          {item.status === "S" ? (
                            <div className="mt-3">
                              <p>
                                รับรถเมื่อ{" "}
                                {moment(item.startDate).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </p>
                              <p>
                                คืนรถเมื่อ{" "}
                                {moment(item.endDate).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
                              </p>
                              <p>
                                ระยะทางเดินทาง {item.endMile - item.startMile}{" "}
                                KM
                              </p>
                            </div>
                          ) : null}
                        </Timeline.Item>
                      ))}
                    </>
                  ) : (
                    <div>
                      <Skeleton active />
                      <br />
                      <Skeleton active />
                    </div>
                  )}
                </Timeline>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Detail;
