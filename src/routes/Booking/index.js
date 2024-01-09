import { Spin, Tabs } from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";

import { API_URL, authUser } from "../../repositories/repository";
import axios from "axios";

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
      console.log("fffffff", res);
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
          การจองในวันนี้{" "}
          {acc >= 0 ? (
            <span className="badge bg-danger">{acc}</span>
          ) : (
            <Spin size="small" />
          )}
        </h5>
      ),
      children: <Running />,
    },
    {
      key: "2",
      label: (
        <h5>
          การจองรออนุมัติ{" "}
          {wacc >= 0 ? (
            <span className="badge bg-danger">{wacc}</span>
          ) : (
            <Spin size="small" />
          )}
        </h5>
      ),
      children: <Wait />,
    },
    {
      key: "3",
      label: (
        <h5>
          การจองสำเร็จ{" "}
          {success >= 0 ? (
            <span className="badge bg-danger">{success}</span>
          ) : (
            <Spin size="small" />
          )}
        </h5>
      ),
      children: <Complete />,
    },
    {
      key: "4",
      label: (
        <h5>
          รายการยกเลิก{" "}
          {canceled >= 0 ? (
            <span className="badge bg-danger">{canceled}</span>
          ) : (
            <Spin size="small" />
          )}
        </h5>
      ),
      children: <Cancelled />,
    },
    {
      key: "5",
      label: (
        <h5>
          การจองทั้งหมด{" "}
          {total >= 0 ? (
            <span className="badge bg-danger">{total}</span>
          ) : (
            <Spin size="small" />
          )}
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

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};
export default Index;
