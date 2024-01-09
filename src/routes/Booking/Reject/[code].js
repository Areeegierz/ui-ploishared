import axios from "axios";
import { useEffect, useRef } from "react";
import { API_URL } from "../../../repositories/repository";
import { Button, Form, Result, Row, message } from "antd";
import TextArea from "antd/lib/input/TextArea";

const Reject = (props) => {
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    if (props.match.params.code) {
      axios
        .get(API_URL + `Booking/Reject?code=${props.match.params.code}`)
        .then((res) => {
          message.success(`ปฏิเสธคำขอใช้รถส่วนกลางสำเร็จ`);
        });
    }
  }, [props]);
  return (
    <>
      {" "}
      <Result
        status="error"
        title="คุณไม่อนุมัติการจอง"
        subTitle={`หมายเลขการจอง: ${props.match.params.code} สถานะ : ไม่อนุมัติ`}
        extra={[]}
      />
    </>
  );
};

export default Reject;
