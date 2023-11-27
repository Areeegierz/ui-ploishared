import { Button, Form, Input, Row, Select, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, authUser } from "../../repositories/repository";

const Booking = ({ data, start, end }) => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState([]);
  const [user, setUser] = useState([]);
  const [buttonLoading, setButtonLoading] = useState();
  const [formLoading, setFormLoading] = useState();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ name: authUser.name, approver: authUser.approver });
      getUser();
      getProvince();
    }
  }, [data]);

  function getProvince() {
    axios.get(API_URL + `Province/Get`).then((res) => {
      setProvince(res.data.province);
    });
  }

  function getUser() {
    axios.get(API_URL + `User/GetById?id=${authUser.id}`).then((res) => {
      setUser(res.data.user);
      setFormLoading(true);
      form.setFieldsValue({
        phone: res.data.user.phone,
        approver: res.data.user.approver,
      });
      setFormLoading(false);
    });
  }

  const onFinish = (values) => {
    setButtonLoading(true);
    console.log(values);
    var context = {
      id: 0,
      startDate: new Date(start),
      endDate: new Date(end),
      target: values.target,
      costCenter: values.costCenter,
      note: values.note,
      status: "WA",
      carId: data.id,
      createAt: new Date(),
      approver: values.approver,
      createBy: authUser.id,
      startId: 0,
      endId: 0,
    };

    axios
      .post(API_URL + `Booking/Create?phone=${values.phone}`, context)
      .then((res) => {
        message.success(`การจองสำเร็จ กรุณารออนุมัติ`);
        setButtonLoading(false);

        setTimeout(() => window.location.reload(), 2000);
      });
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <>
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
        <Form.Item
          rules={[
            {
              required: true,
              message: "โปรดระบุชื่อ-สกุล",
            },
          ]}
          name="name"
          label="ชื่อ-สกุล"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "โปรดระบุเบอร์โทร",
            },
          ]}
          name="phone"
          label="เบอร์โทรศัพท์"
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "โปรดเลือกจังหวัดที่เดินทาง",
            },
          ]}
          name="target"
          label="จังหวัดที่เดินทาง"
        >
          <Select
            allowClear
            showSearch
            optionFilterProp="children"
            onSearch={onSearch}
            placeholder={`กรุณาเลือกจังหวัดปลายทาง`}
          >
            {province.map((i) => (
              <Select.Option key={i.sNo} value={i.sNo}>
                {i.nameInThai}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "โปรดระบุ CostCenter",
            },
          ]}
          name="costCenter"
          label="CostCenter"
        >
          <Input />
        </Form.Item>
        <Form.Item name="note" label="หมายเหตุ">
          <Input />
        </Form.Item>
        <h5>ข้อมูลผู้อนุมัติ</h5>
        <hr style={{ backgroundColor: "blue" }} />

        <Form.Item
          rules={[
            {
              required: true,
              message: "โปรดระบุอีเมลผู้อนุมัติการจอง",
            },
          ]}
          name="approver"
          label="อีเมลผู้อนุมัติ"
        >
          <Input addonAfter={"@scg.com"} />
        </Form.Item>

        <Row justify={`center`}>
          <Button
            loading={buttonLoading}
            htmlType="submit"
            className="btn btn-primary"
          >
            บันทึก
          </Button>
        </Row>
      </Form>
    </>
  );
};
export default Booking;
