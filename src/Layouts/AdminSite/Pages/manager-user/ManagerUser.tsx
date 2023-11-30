import { useState } from "react";
import Header from "../../Components/Layouts/Header";
import TableUser from "../../Components/Table/TableUser";

const ManagerUser = () => {
  const [valueSearch, setValueSearch] = useState<any>([]);
  const handleSearch = (data: any) => {
    setValueSearch(data);
  };
  return (
    <div className="mx-10 mt-5">
      <Header
        title={"QUẢN LÝ NGƯỜI DÙNG"}
        slug={"USER"}
        handleSearch={handleSearch}
      />
      <div className="mt-4">
        <TableUser valueSearch={valueSearch} />
      </div>
    </div>
  );
};

export default ManagerUser;
