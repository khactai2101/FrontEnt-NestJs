import React from "react";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";
import TableOrder from "../../Components/Table/TableOrder";

const ManagerOrder = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ ĐƠN HÀNG"} />
      <div className="mt-4">
        <TableOrder />
      </div>
    </div>
  );
};

export default ManagerOrder;
