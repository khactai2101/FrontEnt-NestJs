import React from "react";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";
import TableBlogs from "../../Components/Table/TableBlogs";

const ManagerBlogs = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ BLOGS"} />

      <div className="mt-4">
        <TableBlogs />
      </div>
    </div>
  );
};

export default ManagerBlogs;
