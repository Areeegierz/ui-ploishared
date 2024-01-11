import React from "react";
import { Breadcrumb, Card } from "antd";

const Basic = ({ slug, pre }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <h3>{slug}</h3>
      <Breadcrumb>
        <Breadcrumb.Item>
          <span className="gx-link">{pre}</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{slug}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default Basic;
