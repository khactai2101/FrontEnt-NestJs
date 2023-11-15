import React, { useState } from "react";
import Header from "../../Components/Layouts/Header";
import Pagination from "../../Components/pagination/Pagination";
import TableCategory from "../../Components/Table/TableCategory";

const ManagerCategory = () => {
  const [valueSearch, setValueSearch] = useState<any>([]);
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };
  return (
    <div className="ml-10 mt-5">
      <Header
        title={"QUẢN LÝ DANH MỤC"}
        slug={"CATEGORY"}
        handleSearch={handleSearch}
      />

      <div className="mt-4">
        <TableCategory valueSearch={valueSearch} />
      </div>
    </div>
  );
};

export default ManagerCategory;
