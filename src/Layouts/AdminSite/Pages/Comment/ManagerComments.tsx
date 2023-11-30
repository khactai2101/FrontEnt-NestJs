import Header from "../../Components/Layouts/Header";
import TableComments from "../../Components/Table/TableComments";

const ManagerComments = () => {
  return (
    <div className="ml-10 mt-5">
      <Header title={"QUẢN LÝ BÌNH LUẬN"} />

      <div className="mt-4">
        <TableComments />
      </div>
    </div>
  );
};

export default ManagerComments;
