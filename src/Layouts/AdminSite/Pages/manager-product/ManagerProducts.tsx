import React, { useState } from "react";
import Header from "../../Components/Layouts/Header";
import TableProduct from "../../Components/Table/TableProduct";
import { Pagination } from "antd";

export const ManagerProducts = () => {
  const [valueSearch, setValueSearch] = useState<any>([]);

  const handleSearch = (data: any) => {
    setValueSearch(data);
  };

  return (
    <div className="mx-10 mt-5 ">
      <Header
        title={"QUẢN LÝ SẢN PHẨM"}
        slug={"PRODUCT"}
        handleSearch={handleSearch}
      />

      <div className="mt-4">
        <TableProduct valueSearch={valueSearch} />
      </div>

      <div className="m-10 text-center ">
        {/* <Pagination data={valueSearch} handlePage={handlePage} /> */}
      </div>
    </div>
  );
};
