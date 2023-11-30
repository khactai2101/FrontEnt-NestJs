import Header from "../../Components/Layouts/Header";
import TableSize from "../../Components/Table/TableSize";

const MangerSize = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"Size"} />
      <div className="mt-4">
        <TableSize />
      </div>
    </div>
  );
};

export default MangerSize;
