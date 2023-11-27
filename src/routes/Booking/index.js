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
import { API_URL, authUser } from "../../repositories/repository";
import axios from "axios";
import { values } from "lodash";
import Running from "./running";
import Complete from "./complete";
import Cancelled from "./cancelled";
import All from "./all";
import Wait from "./wait";
import { useEffect, useState } from "react";

const Index = () => {
  const [acc, setAcc] = useState();
  const [wacc, setWAcc] = useState();
  const [canceled, setCanceled] = useState();
  const [success, setSuccess] = useState();
  const [total, setTotal] = useState();
  useEffect(() => {
    getNotice(authUser.id);
  }, []);

  function getNotice(uid) {
    axios.get(API_URL + `Booking/Notice?uid=${uid}`).then((res) => {
      setAcc(res.data.acc);
      setWAcc(res.data.wacc);
      setCanceled(res.data.cancel);
      setSuccess(res.data.success);
      setTotal(res.data.total);
    });
  }
  const items = [
    {
      key: "1",
      label: (
        <h5>
          การจองในวันนี้ <span className="badge bg-danger">{acc}</span>
        </h5>
      ),
      children: <Running />,
    },
    {
      key: "2",
      label: (
        <h5>
          การจองรออนุมัติ <span className="badge bg-danger">{wacc}</span>
        </h5>
      ),
      children: <Wait />,
    },
    {
      key: "3",
      label: (
        <h5>
          การจองสำเร็จ <span className="badge bg-danger">{success}</span>
        </h5>
      ),
      children: <Complete />,
    },
    {
      key: "4",
      label: (
        <h5>
          รายการยกเลิก <span className="badge bg-danger">{canceled}</span>
        </h5>
      ),
      children: <Cancelled />,
    },
    {
      key: "5",
      label: (
        <h5>
          การจองทั้งหมด <span className="badge bg-danger">{total}</span>
        </h5>
      ),
      children: <All />,
    },
  ];
  const onChange = (values) => {
    console.log(values);
  };
  return (
    <>
      <Basic slug={`จองรถ`} />

      <Tabs defaultActiveKey="4" items={items} onChange={onChange} />
    </>
  );
};
export default Index;
