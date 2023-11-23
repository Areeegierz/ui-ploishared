import { Col, Form, Image, Input, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API_URL, BASE_URL } from "../../repositories/repository";
import axios from "axios";
import Widget from "../../components/Widget";
import { values } from "lodash";

const Detail = (props) => {
  const [form] = Form.useForm();
  const [car, setCar] = useState([]);

  const getData = () => {
    axios
      .get(API_URL + `Car/GetById?id=${props.match.params.id}`)
      .then((res) => {
        console.log(res);
        setCar(res.data.car);
      });
  };
  const onFinish = (values) => {
    console.log(values);
  };

  useEffect(() => {
    if (props.match.params.id) {
      getData();
    }
  }, [props]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <div>
      <Row>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Widget styleName="gx-p-lg-1">
            <div className="gx-fnd-content">
              <h2 className="gx-text-uppercase gx-text-black gx-font-weight-bold gx-fnd-title">
                {car.licensePlate}
              </h2>
              <p>{car.name}</p>
            </div>
            <Image
              width={250}
              className="gx-rounded-lg"
              alt="..."
              src={BASE_URL + car.image}
            />
          </Widget>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <Widget title={"กรอกรายละเอียด"}>
            <Form
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="gx-signin-form gx-form-row0"
            >
              <Form.Item name="Target" label="จังหวัดที่เดินทาง">
                <Select />
              </Form.Item>
              <Form.Item name="name" label="ชื่อ-สกุล">
                <Input />
              </Form.Item>
              <Form.Item name="EmpId" label="เลขประจำตัวพนักงาน">
                <Input />
              </Form.Item>
              <Form.Item name="Email" label="Email">
                <Input />
              </Form.Item>
              <Form.Item name="Phone" label="เบอร์โทรศัพท์">
                <Input />
              </Form.Item>
              <Form.Item name="CostCenter" label="CostCenter">
                <Input />
              </Form.Item>
              <Form.Item name="Note" label="หมายเหตุ">
                <Input />
              </Form.Item>
            </Form>
          </Widget>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Widget title={"ประวัติการจองรถคันนี้ของคุณ"}>
            <Table columns={columns} />
          </Widget>
        </Col>
      </Row>
    </div>
  );
};
export default Detail;
