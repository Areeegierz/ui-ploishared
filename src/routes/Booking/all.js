import { Button, Empty, Input, Table } from "antd";

import Widget from "../../components/Widget";
import { API_URL, authUser } from "../../repositories/repository";
import axios from "axios";
import { useEffect, useState } from "react";

import moment from "moment";
import { CloudDownloadOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "antd/lib/typography/Link";
import { Excel } from "antd-table-saveas-excel";
const All = () => {
  const [tableLoading, setTableLoading] = useState();
  const [tableData, setTableData] = useState([]);
  const [searchedText, setSearchedText] = useState("");

  const getTableData = () => {
    setTableLoading(true);
    axios.get(API_URL + `Booking/Get?uid=${authUser.id}`).then((res) => {
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
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.licensePlate)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.fullName).toLowerCase().includes(value.toLowerCase())
        );
      },
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
  const columnsExport = [
    {
      title: "เลขที่ใบจอง",
      dataIndex: "code",
    },
    {
      title: "วันเวลาที่จองรถ",
      key: "startDate",
      render: (text, record) =>
        moment(record.startDate).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "วันเวลาที่คืนรถ",
      key: "endDate",
      render: (text, record) =>
        moment(record.endDate).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "ทะเบียนรถ",
      dataIndex: "licensePlate",
    },
    {
      title: "จังหวัดปลายทาง",
      dataIndex: "provinceName",
    },
    {
      title: "ไมล์เริ่มต้น",
      dataIndex: "startId",
    },
    {
      title: "ไมล์ตอนคืนรถ",
      dataIndex: "endId",
    },
    {
      title: "ระยะที่ใช้รถ (กม.)",
      dataIndex: "summaryMile",
      render: (text, record) => record.endId - record.startId,
    },
    {
      title: "CostCenter",
      dataIndex: "costCenter",
    },
    {
      title: "ผู้จอง",
      dataIndex: "fullName",
    },
    {
      title: "เบอร์โทรผู้จอง",
      dataIndex: "phone",
    },
    {
      title: "ผู้อนุมัติ",
      dataIndex: "approver",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      render: (record) => (
        <div>
          {record.status === "C"
            ? "ยกเลิก"
            : record.status === "A"
            ? "อนุมัติ"
            : record.status === "WA"
            ? "รออนุมัติ"
            : record.status === "S"
            ? "เสร็จสิ้น"
            : "ไม่มีข้อมูล"}
        </div>
      ),
    },
  ];
  const exportToExcel = () => {
    const excel = new Excel();
    excel
      .addSheet(`รายการจองรถ`)
      .addColumns(columnsExport)
      .addDataSource(tableData, {
        str2Percent: true,
      })
      .saveAs(`รายการจองรถ ${moment().format("DDMMYYYY")}.xlsx`);
  };
  return (
    <>
      {/* {JSON.stringify(tableData)} */}
      <Widget
      // extra={
      //   <Button
      //     type="primary"
      //     style={{ marginTop: "10px" }}
      //     onClick={exportToExcel}
      //     icon={<CloudDownloadOutlined />}
      //   >
      //     <span>Export</span>
      //   </Button>
      // }
      >
        <Input.Search
          placeholder="ค้นหาด้วยทะเบียนรถ หรือ ชื่อผู้จอง"
          onSearch={(value) => {
            setSearchedText(value);
          }}
          onChange={(e) => {
            setSearchedText(e.target.value);
          }}
          style={{ marginBottom: "10px" }}
        />
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
    </>
  );
};
export default All;
