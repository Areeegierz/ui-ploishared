import { Button, Modal, Popconfirm, Table, message } from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget/index";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../repositories/repository";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import Add from "./add";
import Edit from "./edit";
const Index = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  function getData() {
    setTableLoading(true);
    axios.get(API_URL + `User/Get`).then((res) => {
      setUser(res.data.user);
      setTableLoading(false);
    });
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState();
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
  const columns = [
    {
      title: "รหัสพนักงาน",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "ชื่อพนักงาน",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "อีเมล",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "จัดการ",
      render: (text, record) => (
        <div>
          <Button
            style={{ color: "#286efb" }}
            icon={<FormOutlined />}
            type="link"
            onClick={() => {
              editModal(record);
            }}
          ></Button>
          <Popconfirm
            title={`คุณต้องการลบ "${record.fullName}" ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              axios
                .delete(API_URL + "user/Remove?id=" + record.id)
                .then((res) => {
                  message.success(`Delete ${record.name} Successfully!`);
                  getData();
                });
            }}
          >
            <Button
              style={{ color: "#FF4141", textAlign: "right" }}
              icon={<DeleteOutlined />}
              type="link"
            ></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState();
  const editModal = (record) => {
    setDataModal({
      id: record.id,
    });
    setEditModalOpen(true);
  };
  return (
    <>
      <Basic slug={`บัญชีผู้ใช้งาน`} />
      <Widget
        title={<h3>บัญชีผู้ใช้งาน</h3>}
        className="mt-5"
        extra={
          <a className="btn btn-primary" onClick={showModal}>
            เพิ่มข้อมูล
          </a>
        }
      >
        <Table loading={tableLoading} dataSource={user} columns={columns} />
      </Widget>

      <Modal
        title="แบบฟอร์มเพิ่มข้อมูลผู้ใช้งาน"
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
