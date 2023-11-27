import { Button, Form, Input, Row, Space, Upload, message } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../repositories/repository";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";

const Start = ({ booking }) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const [file, setFile] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChangeFile = ({ fileList: newFileList }) => {
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

  const onFinish = async (values) => {
    if (file.length < 1) {
      message.error(`กรุณาถ่ายรูปไมล์รถ`);
      return false;
    }
    if (fileList.length < 4) {
      message.error(`กรุณาถ่ายรูปรถ (หน้า,ซ้าย,ขวา,หลัง) ให้ครบตามที่กำหนด`);
      return false;
    }
    let src1 = "";
    let src2 = "";
    let src3 = "";
    let src4 = "";
    let src5 = "";
    src1 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0].originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    src2 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[1].originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    src3 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[2].originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    src4 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[3].originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    src5 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file[0].originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    console.log(values);
    var context = {
      id: 0,
      mile: values.mile,
      image1: src1,
      image2: src2,
      image3: src3,
      image4: src4,
      image5: src5,
      note: null,
      createAt: null,
      createBy: authUser.id,
    };
    axios
      .post(API_URL + `Start/Create?id=${booking.id}`, context)
      .then((res) => {
        message.success(`รับรถสำเร็จ`);
        setTimeout(window.location.reload(), 1000);
      });
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      {JSON.stringify(booking)}
      <Form.Item label={`รูปรถ (หน้า,ซ้าย,ขวา,หลัง)`}>
        <Space
          justify={"center"}
          style={{
            alignItems: "center",
          }}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 4 && "+ Upload"}
          </Upload>
        </Space>
      </Form.Item>
      <Form.Item label={`รูปไมล์`}>
        <Space
          justify={"center"}
          style={{
            alignItems: "center",
          }}
        >
          <Upload
            listType="picture-card"
            fileList={file}
            onChange={onChangeFile}
            onPreview={onPreview}
          >
            {file.length < 1 && "+ Upload"}
          </Upload>
        </Space>
      </Form.Item>

      <Form.Item label={`เลขไมล์`} name={`mile`}>
        <Input />
      </Form.Item>
      <Row justify={"center"}>
        <button type="submit" className="btn btn-primary">
          บันทึก
        </button>
      </Row>
    </Form>
  );
};

export default Start;
