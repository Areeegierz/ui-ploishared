import { Button, Form, Input, Row, Space, Upload, message } from "antd";
import axios from "axios";
import { API_URL, authUser } from "../../repositories/repository";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";

const End = ({ booking }) => {
  const [form] = useForm();
  const [file, setFile] = useState([]);
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
    let src = "";
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file[0].originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    console.log(values);
    var context = {
      id: 0,
      mile: values.mile,
      image: src,
      note: null,
      createAt: null,
      createBy: authUser.id,
    };
    axios
      .post(API_URL + `End/Create?id=${booking.id}`, context)
      .then((res) => {
        message.success(`คืนรถสำเร็จ`);
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
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

      <Form.Item
        label={`เลขไมล์`}
        name={`mile`}
        rules={[
          {
            required: true,
          },
        ]}
      >
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

export default End;
