import React, { ChangeEvent, useEffect, useState } from "react";
import { changeStatusUser, getAllUsers } from "../../../../API/user";
import { message } from "antd";
import { getAllOrderByAdmin } from "../../../../API/order";
import { updateHistoryOrder } from "../../../../API/historyOrder";
import Pagination from "../pagination/Pagination";

const TableOrder = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [order, setOrder] = useState<any>();
  const [data, setData] = useState([]);

  const token = localStorage.getItem("accessToken");

  const handlePage = (pagination: any) => {
    setOrder(pagination);
  };
  useEffect(() => {
    const fetchData = async () => {
      const allOrderByAdmin = await getAllOrderByAdmin(token);
      setData(allOrderByAdmin);
    };
    fetchData();
  }, []);

  // const handleChange = async (
  //   event: ChangeEvent<HTMLSelectElement>,
  //   orderId: any
  // ) => {
  //   const response = await updateHistoryOrder(orderId, +event.target.value);
  //   if (response) {
  //     const fetchData = async () => {
  //       const allOrderByAdmin = await getAllOrderByAdmin(token);
  //       setOrder(allOrderByAdmin);
  //     };
  //     fetchData();
  //   }
  // };
  const handleChange = async (
    event: ChangeEvent<HTMLSelectElement>,
    orderId: any
  ) => {
    const response = await updateHistoryOrder(orderId, +event.target.value);
    if (response) {
      // Cập nhật dữ liệu trên màn hình từ dữ liệu mới nhất
      const updatedData = await getAllOrderByAdmin(token);
      setOrder(updatedData);

      // Gọi lại hàm handlePage để cập nhật trang
      handlePage(updatedData);
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center mb-2"></div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Mã đơn hàng
              </th>
              <th scope="col" className="px-6 py-3">
                địa chỉ
              </th>
              <th scope="col" className="px-6 py-3">
                trạng thái đơn hàng
              </th>

              <th scope="col" className="px-6 py-3">
                trạng thái
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.map((item: any) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th scope="col" className="px-6 py-3">
                  {item.id}
                </th>
                <td className="px-6 py-4">{item.codeOrder}</td>
                <td className="px-6 py-4">{item.address.address}</td>
                <select
                  className="border border-collapse rounded-lg w-full"
                  value={item.status}
                  onChange={(e) => handleChange(e, item.id)}
                >
                  <option value={1}>Đang chờ xác nhận</option>
                  <option value={3}>Đã xác nhận</option>
                  <option value={4}>Đang giao</option>
                  <option value={5}>Đã giao</option>
                  <option value={2}>Đã hủy</option>
                </select>

                <td className="px-6 py-4 flex">
                  {item.role === 1 ? (
                    <button
                      type="button"
                      className={`text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 ${
                        item.status === 0
                          ? "bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-green-300"
                          : "bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                      }`}
                      // onClick={() => handleBlock(user.id)}
                    >
                      {item.status === 0 ? "Unblock" : "Block"}
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination data={data} handlePage={handlePage} />
      </div>
    </>
  );
};

export default TableOrder;
