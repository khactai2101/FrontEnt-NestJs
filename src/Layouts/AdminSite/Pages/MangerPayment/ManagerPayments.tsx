import React from "react";
import TablePayments from "../../Components/Table/TablePayment";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";

const ManagerPayments = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ PAYMENTS"} />

      <div className="mt-4">
        <TablePayments />
      </div>
    </div>
  );
};

export default ManagerPayments;
