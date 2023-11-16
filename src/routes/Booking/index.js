import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Space,
  TimePicker,
} from "antd";
import Basic from "../../components/navigation/Breadcrumb/Basic";

const Index = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <>
      <Basic slug={`จองรถ`} />
      <Row justify={"center"}>
        <Col lg={8} xl={8} md={24} xs={24} sm={24}>
          <Card className="mt-5" title={`ตัวเลือกการจองรถ`}>
            <Form layout="vertical">
              <Form.Item name={`date`} label={`วันที่ยืมรถ`}>
                <DatePicker onChange={onChange} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name={`time`} label={`เวลา รับ-คืน รถ`}>
                <TimePicker.RangePicker
                  status="warning"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Row justify={"center"}>
                <Button type="primary" htmlType="submit">
                  ค้นหา
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Index;
