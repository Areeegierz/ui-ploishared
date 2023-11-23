import { Button, Form, Input, Row, Upload, message } from "antd";
import axios from "axios";
import { API_URL, BASE_URL, authUser } from "../../repositories/repository";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";

const Edit = ({ data }) => {
  useEffect(() => {
    if (data) {
      console.log(data);
      form.setFieldsValue(data);
      setImage(data.id);
      setFileList([
        {
          url: BASE_URL + data.image,
        },
      ]);
    }
  }, [data]);
  function setImage(id) {
    axios.get(API_URL + `Image/GetByCarId?id=${id}`).then((res) => {
      res.data.img.map((item) => (item.url = BASE_URL + item.url));
      setFileList(res.data.img);
    });
  }
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
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setFile(newFileList);
  };
  const [file, setFile] = useState([]);
  const [form] = useForm();
  const [buttonLoading, setButtonLoading] = useState();
  const onFinish = (values) => {
    setButtonLoading(true);

    var context = {
      id: values.id,
      licensePlate: values.licensePlate,
      name: values.name,
      createBy: authUser.user.id,
    };
    axios.put(API_URL + `Car/Update`, context).then((res) => {
      console.log(res);
      message.success(`แก้ไขข้อมูลสำเร็จ`);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      form.resetFields();
      setButtonLoading(false);
    });
  };
  return (
    <>
      {JSON.stringify(data)}
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item name={`id`} label={`id`} hidden="true"></Form.Item>
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
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
        <Row justify={"center"}>
          <Button loading={buttonLoading} type="primary" htmlType="submit">
            บันทึก
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default Edit;
