import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Table,
  Tabs,
  TimePicker,
} from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";
import Widget from "../../components/Widget";
import { API_URL } from "../../repositories/repository";
import axios from "axios";
import { values } from "lodash";
import Running from "./running";
import Complete from "./complete";
import Cancelled from "./cancelled";
import All from "./all";

const Index = () => {
  const items = [
    {
      key: "1",
      label: "การจองในวันนี้",
      children: <Running />,
    },
    {
      key: "2",
      label: "การจองสำเร็จ",
      children: <Complete />,
    },
    {
      key: "3",
      label: "การจองทั้งหมด",
      children: <All />,
    },
    {
      key: "4",
      label: "รายการยกเลิก",
      children: <Cancelled />,
    },
  ];
  const onChange = (values) => {
    console.log(values);
  };
  return (
    <>
      <Basic slug={`จองรถ`} />

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};
export default Index;
