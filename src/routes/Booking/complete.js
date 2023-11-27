import { Button, Popconfirm, Table } from "antd";

import Widget from "../../components/Widget";
import { API_URL, authUser } from "../../repositories/repository";
import axios from "axios";
import { useEffect, useState } from "react";
import { takeEvery } from "redux-saga/effects";
import moment from "moment";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
const Complete = () => {
  const [tableLoading, setTableLoading] = useState();
  const [tableData, setTableData] = useState([]);
  const getTableData = () => {
    setTableLoading(true);
    axios
      .get(API_URL + `Booking/Get?uid=${authUser.id}&status=A`)
      .then((res) => {
        setTableData(res.data.booking);
        setTableLoading(false);
      });
  };
  useEffect(() => {
    getTableData();
  }, []);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const columns = [
    {
      title: "ระยะเวลาที่จองรถ",
      key: "date",
      render: (text, record) => (
        <div>
          {moment(record.startDate).format("DD/MM/YYYY HH:mm") +
            " - " +
            moment(record.endDate).format("DD/MM/YYYY HH:mm")}
        </div>
      ),
    },
    {
      title: "รายการรถที่จอง",
      dataIndex: "licensePlate",

      render: (text, record) => (
        <div>{record.licensePlate + " " + record.name}</div>
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "Status",

      render: (text, record) => (
        <div>
          {record && record.status == "WA" ? (
            <span className="btn btn-default" style={{ color: "gray" }}>
              รออนุมัติ
            </span>
          ) : null}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (text, record) => (
        <div>
          <Popconfirm
            title={`คุณต้องการลบ "${record.refCode}" ใช่หรือไม่?`}
            okText="Yes"
            cancelText="No"
            onConfirm={() => {}}
          >
            <Button
              className="btn btn-primary"
              icon={<EyeOutlined />}
              type="link"
            >
              ดูรายละเอียด
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      <Widget>
        <Table
          loading={tableLoading}
          columns={columns}
          dataSource={tableData}
        />
      </Widget>
    </>
  );
};
export default Complete;
