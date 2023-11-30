import { useEffect } from "react";
import Sidebar from "../../Components/Layouts/Sidebar";
import { Outlet } from "react-router-dom";
import * as io from "socket.io-client";
import { getAllOrderByAdmin } from "../../../../API/order";

const socket = io.connect("http://localhost:9000");

const AdminLayout = () => {
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const handleOrder = async () => {
      await getAllOrderByAdmin(token);
      // message.success("Có đơn hàng mới");
    };

    socket.on("order", handleOrder);

    return () => {
      socket.off("order", handleOrder);
    };
  }, [token]);

  return (
    <div className="flex w-full gap-1">
      <div className="w-1/6">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
