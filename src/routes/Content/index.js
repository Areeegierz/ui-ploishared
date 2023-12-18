import React from "react";

import IntlMessages from "../../util/IntlMessages";
import CK from "../../components/CK";

const ContentPage = () => {
  return (
    <>
      <h2 className="title gx-mb-4">
        <IntlMessages id="จัดการเนื้อหา" />
      </h2>
      <div>
        <CK />
      </div>
    </>
  );
};
export default ContentPage;
