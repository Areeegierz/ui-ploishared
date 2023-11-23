import { Table } from "antd";

import Widget from "../../components/Widget";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../repositories/repository";

const Running = () => {
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
export default Running;
