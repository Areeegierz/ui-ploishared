import {
  Button,
  Col,
  Image,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Spin,
  message,
} from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget/index";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BASE_URL } from "../../repositories/repository";

import Add from "./add";
import Edit from "./edit";
import {
  DeleteOutlined,
  FormOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
const Index = () => {
  const [car, setCar] = useState([]);
  const [dataModal, setDataModal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const getData = () => {
    axios.get(API_URL + `Car/Get`).then((res) => {
      setCar(res.data.car);
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    getData();
    setIsModalOpen(false);
    setEditModalOpen(false);
  };
  const handleCancel = () => {
    getData();

    setIsModalOpen(false);
    setEditModalOpen(false);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const editModal = (record) => {
    setDataModal(record);
    setEditModalOpen(true);
  };
  const confirm = (val) => {
    console.log("val", val);
    axios
      .delete(API_URL + `Car/Remove?id=${val.id}`)
      .then((res) => {
        message.success(`ลบ ${val.name} แล้ว`);
        getData();
      })
      .catch(message.error("เกิดข้อผิดพลาด"));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Basic slug={`จัดการรถ`} />
      <Widget
        title={<h3>รายการรถที่จองในระบบ</h3>}
        className="mt-5"
        extra={
          <a className="btn btn-primary" onClick={showModal}>
            เพิ่มข้อมูล
          </a>
        }
      >
        <Row>
          {car ? (
            car.map((item) => (
              <Col lg={12} xl={12} md={24} xs={24} sm={24}>
                <Widget styleName="gx-p-lg-1">
                  <Row>
                    <Col xl={6} lg={10} md={10} sm={10} xs={24}>
                      <Image
                        width={80}
                        className="gx-rounded-lg"
                        alt="..."
                        src={BASE_URL + item.image}
                      />
                    </Col>
                    <Col xl={18} lg={14} md={14} sm={14} xs={24}>
                      <Row className="p-2">
                        <div className="gx-fnd-content">
                          <h2 className="gx-text-uppercase gx-text-black gx-font-weight-bold gx-fnd-title">
                            {item.licensePlate}
                          </h2>
                          <p>{item.name}</p>
                        </div>
                      </Row>
                    </Col>
                    <Col span={24} style={{ justifyContent: "right" }}>
                      <Row className="p-2">
                        <div className="gx-fnd-content">
                          <Popconfirm
                            onConfirm={() => confirm(item)}
                            title={`พี่อุ้มต้องการลบ ${item.licensePlate} ?`}
                            description={`Are you sure to delete ${item.licensePlate}?`}
                            icon={
                              <QuestionCircleOutlined
                                style={{
                                  color: "red",
                                }}
                              />
                            }
                          >
                            <Button icon={<DeleteOutlined />} danger></Button>
                          </Popconfirm>

                          <Button
                            style={{ color: "#286efb" }}
                            icon={<FormOutlined />}
                            type="link"
                            onClick={() => {
                              editModal(item);
                            }}
                          ></Button>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </Widget>
              </Col>
            ))
          ) : (
            <Skeleton />
          )}
        </Row>
      </Widget>

      <Modal
        title="แบบฟอร์มเพิ่มข้อมูลรถ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Add />
      </Modal>
      <Modal
        title="แบบฟอร์มแก้ไขข้อมูลผู้ใช้งาน"
        open={editModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Edit data={dataModal} />
      </Modal>
    </>
  );
};
export default Index;
