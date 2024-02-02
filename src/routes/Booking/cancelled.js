import { Button, Empty, Popconfirm, Table } from "antd";

import Widget from "../../components/Widget";
import { API_URL, authUser } from "../../repositories/repository";
import axios from "axios";
import { useEffect, useState } from "react";
import { takeEvery } from "redux-saga/effects";
import moment from "moment";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "antd/lib/typography/Link";
const Cancelled = () => {
  const [tableLoading, setTableLoading] = useState();
  const [tableData, setTableData] = useState([]);
  const getTableData = () => {
    setTableLoading(true);
    axios
      .get(API_URL + `Booking/Get?uid=${authUser.id}&status=C`)
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
          {record && record.status == "C" ? (
            <span className="btn" style={{ color: "red" }}>
              ยกเลิก
            </span>
          ) : null}
          {record && record.status == "S" ? (
            <span className="btn" style={{ color: "blue" }}>
              เสร็จสิ้น
            </span>
          ) : null}
          {record && record.status == "A" ? (
            <span className="btn" style={{ color: "green" }}>
              อนุมัติแล้ว
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
          <Link href={`/booking/${record.id}`} as={`/booking/[id]`}>
            <Button
              className="btn btn-primary"
              icon={<EyeOutlined />}
              type="link"
            >
              ดูรายละเอียด
            </Button>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Widget>
        <Table
          scroll={{ x: 1300, y: "100%" }}
          loading={tableLoading}
          columns={columns}
          dataSource={tableData}
          locale={{
            emptyText: (
              <Empty description={"ไม่มีรายการจอง"}>
                <Button href={"/"} type="primary">
                  ไปจองเลย !
                </Button>
              </Empty>
            ),
          }}
        />
      </Widget>
    </div>
  );
};
export default Cancelled;
