import { useState } from "react";
import Header from "../../Components/Layouts/Header";
import TableBrands from "../../Components/Table/TableBrand";

const ManagerBrands = () => {
  const [valueSearch, setValueSearch] = useState<any>([]);
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };

  return (
    <div className="ml-10 mt-5">
      <Header
        title={"QUẢN LÝ THƯƠNG HIỆU"}
        slug={"BRAND"}
        handleSearch={handleSearch}
      />

      <div className="mt-4">
        <TableBrands valueSearch={valueSearch} />
      </div>
    </div>
  );
};

export default ManagerBrands;
