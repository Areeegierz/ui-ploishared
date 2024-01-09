import axios from "axios";
import { useEffect, useRef } from "react";
import { API_URL } from "../../../repositories/repository";
import { Result, message } from "antd";

const Approve = (props) => {
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    if (props.match.params.code) {
      axios
        .get(API_URL + `Booking/Approve?code=${props.match.params.code}`)
        .then((res) => {
          message.success(`อนุมัติคำขอใช้รถส่วนกลางสำเร็จ`);
        });
    }
  }, [props]);
  return (
    <>
      <Result
        status="success"
        title="คุณได้อนุมัติการจองแล้ว"
        subTitle={`หมายเลขการจอง: ${props.match.params.code}  สถานะ : อนุมัติ`}
        extra={["ขอบคุณ"]}
      />
    </>
  );
};

export default Approve;
