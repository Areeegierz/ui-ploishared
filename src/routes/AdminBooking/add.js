import { Button, Form, Input, Row, message } from "antd";
import axios from "axios";
import { API_URL } from "../../repositories/repository";
import { useForm } from "antd/lib/form/Form";

const Add = () => {
  const [form] = useForm();
  const onFinish = (values) => {
    var context = {
      id: 0,
      username: values.username,
      password: values.password,
      code: values.code,
      fullName: values.fullName,
      email: values.username,
      phone: values.phone,
      status: "A",
      approver: values.approver,
      role: "member",
      createAt: null,
    };
    axios.post(API_URL + `user/create`, context).then((res) => {
      console.log(res);
      message.success(`บันทึกข้อมูลสำเร็จ`);
      form.resetFields();
    });
  };
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        name={`username`}
        label={`ชื่อผู้ใช้งาน`}
        rules={[
          {
            required: true,
            message: "The input your username!",
          },
        ]}
      >
        <Input addonAfter="@SCG.com" placeholder="ชื่อผู้ใช้งาน" />
      </Form.Item>
      <Form.Item
        name={`password`}
        label={`รหัสผ่าน`}
        rules={[
          {
            required: true,
            message: "The input your password!",
          },
        ]}
      >
        <Input.Password placeholder="รหัสผ่าน" />
      </Form.Item>

      <Form.Item
        name={`code`}
        label={`รหัสพนักงาน`}
        rules={[
          {
            required: true,
            message: "The input your code!",
          },
        ]}
      >
        <Input placeholder="รหัสพนักงาน" />
      </Form.Item>
      <Form.Item
        name={`fullName`}
        label={`ชื่อ-นามสกุล`}
        rules={[
          {
            required: true,
            message: "The input your fullname!",
          },
        ]}
      >
        <Input placeholder="ชื่อ-นามสกุล" />
      </Form.Item>
      <Form.Item
        name={`phone`}
        label={`เบอร์โทรศัพท์`}
        rules={[
          {
            required: true,
            message: "The input your phone!",
          },
        ]}
      >
        <Input placeholder="เบอร์โทรศัพท์" />
      </Form.Item>
      <Form.Item
        name={`approver`}
        label={`ผู้อนุมัติ`}
        rules={[
          {
            required: true,
            message: "The input your approver!",
          },
        ]}
      >
        <Input addonAfter="@SCG.com" placeholder="ผู้อนุมัติ" />
      </Form.Item>
      <Row justify={"center"}>
        <Button type="primary" htmlType="submit">
          บันทึก
        </Button>
      </Row>
    </Form>
  );
};

export default Add;
