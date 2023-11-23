import React from "react";
import { Breadcrumb, Card } from "antd";

const Basic = ({ slug }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h3>{slug}</h3>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <span className="gx-link">{slug}</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Basic;
