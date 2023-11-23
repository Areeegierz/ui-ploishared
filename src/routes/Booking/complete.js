import { Table } from "antd";

import Widget from "../../components/Widget";
import { API_URL } from "../../repositories/repository";
import axios from "axios";
import { useEffect, useState } from "react";

const Complete = () => {
  const [tableLoading, setTableLoading] = useState();
  const [tableData, setTableData] = useState("");
  const getTableData = () => {
    setTableLoading(true);
    axios.get(API_URL + "Booking/Get").then((res) => {
      setTableData(res.data);
      setTableLoading(false);
    });
  };
  useEffect(() => {
    getTableData();
  }, []);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onAdd = (values) => {
    console.log(values);
    axios.get(API_URL + "Car/Get").then((res) => {
      console.log("getcar", res);
    });
  };
  const columns = [
    {
      title: "วันที่จอง",
      dataIndex: "BookingDate",
      key: "BookingDate",
    },
    {
      title: "ทะเบียนรถ",
      dataIndex: "LicensePlate",
      key: "LicensePlate",
    },
    {
      title: "สถานะ",
      dataIndex: "Status",
      key: "Status",
    },
  ];
  return (
    <>
      <Widget>
        <Table loading={tableLoading} columns={columns} />
      </Widget>
    </>
  );
};
export default Complete;
