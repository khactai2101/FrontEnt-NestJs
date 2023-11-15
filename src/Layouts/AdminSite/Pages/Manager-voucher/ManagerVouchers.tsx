import React from "react";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";
import TableVouchers from "../../Components/Table/TableVouchers";

const ManagerVouchers = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ VOUCHER"} />

      <div className="mt-4">
        <TableVouchers />
      </div>
    </div>
  );
};

export default ManagerVouchers;
