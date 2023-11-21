import React, { useState } from "react";
import Header from "../../Components/Layouts/Header";
import TableProduct from "../../Components/Table/TableProduct";

const ManagerProducts = () => {
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
    </div>
  );
};

export default ManagerProducts;
