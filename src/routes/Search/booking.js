import { Button, Form, Input, Row, Select, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, authUser } from "../../repositories/repository";

const Booking = ({ data }) => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ name: authUser.name, approver: authUser.approver });
      getProvince();
    }
  }, [data]);

  function getProvince() {
    axios.get(API_URL + `Province/Get`).then((res) => {
      setProvince(res.data.province);
    });
  }

  const onFinish = (values) => {
    console.log(values);
    var context = {
      id: 0,
      startDate: "2023-11-23T09:42:35.967Z",
      endDate: "2023-11-23T09:42:35.967Z",
      target: values.province,
      costCenter: values.costCenter,
      note: values.note,
      status: "WA",
      carId: data.id,
      createAt: "2023-11-23T09:42:35.967Z",
      approver: values.approver,
      createBy: authUser.id,
      startId: 0,
      endId: 0,
    };

    axios.post(API_URL + `Booking/Create`, context).then((res) => {
      message.success(`การจองสำเร็จ กรุณารออนุมัติ`);
      setTimeout(() => window.location.reload(), 2000);
    });
  };

  return (
    <>
      {/* {JSON.stringify(authUser)} */}
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="gx-signin-form gx-form-row0"
      >
        <h5>ข้อมูลผู้จองรถ</h5>
        <hr style={{ backgroundColor: "blue" }} />
        <Form.Item name="Target" label="จังหวัดที่เดินทาง">
          <Select placeholder={`กรุณาเลือกจังหวัดปลายทาง`}>
            {province.map((i) => (
              <Select.Option key={i.sNo} value={i.sNo}>
                {i.nameInThai}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" label="ชื่อ-สกุล">
          <Input />
        </Form.Item>
        {/* <Form.Item name="EmpId" label="เลขประจำตัวพนักงาน">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item> */}
        <Form.Item name="Phone" label="เบอร์โทรศัพท์">
          <Input />
        </Form.Item>
        <Form.Item name="CostCenter" label="CostCenter">
          <Input />
        </Form.Item>
        <Form.Item name="Note" label="หมายเหตุ">
          <Input />
        </Form.Item>

        <h5>ข้อมูลผู้อนุมัติ</h5>
        <hr style={{ backgroundColor: "blue" }} />

        <Form.Item name="approver" label="อีเมลผู้อนุมัติ">
          <Input />
        </Form.Item>

        <Row justify={`center`}>
          <Button htmlType="submit" className="btn btn-primary">
            บันทึก
          </Button>
        </Row>
      </Form>
    </>
  );
};
export default Booking;
