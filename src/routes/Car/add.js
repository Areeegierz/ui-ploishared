import { Button, Form, Input, Row, Upload, message } from "antd";

import axios from "axios";
import { API_URL, authUser } from "../../repositories/repository";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Add = () => {
  const [form] = useForm();
  const [file, setFile] = useState([]);
  const onFinish = async (values) => {
    const imageList = [];
    for (let i = 0; i < fileList.length; i++) {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file[i].originFileObj);
        reader.onload = () => resolve(reader.result);
      });
      var body = {
        id: 0,
        image1: src,

        createBy: authUser.id,
        carId: 0,
        status: "A",
      };
      imageList.push(body);
    }
    var context = {
      car: {
        id: 0,
        name: values.name,
        licensePlate: values.licensePlate,

        createBy: authUser.id,
      },
      img: imageList,
    };
    console.log(context);
    axios.post(API_URL + `Car/Create`, context).then((res) => {
      console.log(res);
      if (res.data === "dupdata") {
        message.error(`มีข้อมูลรถคันนี้อยู่แล้ว`);
        return false;
      }
      message.success(`บันทึกข้อมูลสำเร็จ`);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
      form.resetFields();
    });
  };

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setFile(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item
        name={`licensePlate`}
        label={`ทะเบียนรถ`}
        rules={[
          {
            required: true,
            message: "The input your License Plate!",
          },
        ]}
      >
        <Input placeholder="ทะเบียนรถ" />
      </Form.Item>

      <Form.Item
        name={`name`}
        label={`รุ่น`}
        rules={[
          {
            required: true,
            message: "The input your password!",
          },
        ]}
      >
        <Input placeholder="ยี่ห้อ" />
      </Form.Item>
      <Upload
        listType="picture-card"
        action={API_URL + "Car/Upload"}
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 4 && "+ Upload"}
      </Upload>

      <Row justify={"center"}>
        <Button type="primary" htmlType="submit">
          บันทึก
        </Button>
      </Row>
    </Form>
  );
};

export default Add;
