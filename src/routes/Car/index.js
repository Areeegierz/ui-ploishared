import {
  Button,
  Col,
  Image,
  Modal,
  Popconfirm,
  Row,
  Skeleton,
  Spin,
  Tag,
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
import Link from "antd/lib/typography/Link";
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
        title={<h3>รายการรถในระบบ</h3>}
        className="mt-5"
        extra={
          <a className="btn btn-primary" onClick={showModal}>
            เพิ่มข้อมูล
          </a>
        }
      >
        <Row>
          {car[0] == null ? (
            <Skeleton active />
          ) : (
            car.map((item) => (
              <div className="col-md-4 p-3">
                <div className="card p-3" style={{ borderRadius: "22px" }}>
                  <Row>
                    <Col md={10} sm={10} xl={8} lg={12} xs={10}>
                      <Image
                        className="gx-rounded-lg"
                        src={BASE_URL + item.image}
                        width={90}
                        height={90}
                        alt="..."
                      />
                    </Col>
                    <Col md={14} sm={14} xl={16} lg={12} xs={14}>
                      <Tag
                        className="gx-rounded-xs gx-text-uppercase"
                        color="#06BB8A"
                      >
                        {item.licensePlate}
                      </Tag>
                      <Link href={`/car/${item.id}`} as={`/car/[id]`}>
                        <p className="gx-mb-2">{item.name}</p>
                      </Link>
                      <FormOutlined
                        onClick={() => editModal(item)}
                        style={{ color: "blue" }}
                      />{" "}
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
                        <DeleteOutlined style={{ color: "red" }} />
                      </Popconfirm>
                    </Col>
                  </Row>
                </div>
              </div>
            ))
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
