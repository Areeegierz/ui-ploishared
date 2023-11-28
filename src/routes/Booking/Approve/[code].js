import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../../../repositories/repository";
import { message } from "antd";

const Approve = (props) => {
  useEffect(() => {
    if (props.match.params.code) {
      axios
        .get(API_URL + `Booking/Approve?code=${props.match.params.code}`)
        .then((res) => {
          message.success(`ปฏิเสธคำขอใช้รถส่วนกลางสำเร็จ`);
        });
    }
  }, [props]);
  return <>{JSON.stringify(props)}</>;
};

export default Approve;
