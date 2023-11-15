import React, { useEffect, useState } from "react";
import { changeStatusUser, getAllUsers } from "../../../../API/user";
import { message } from "antd";
import ExportButton from "../Export/Export";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");
const TableUser = (props: any) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const propsModal = { openModal, setOpenModal };
  const [users, setUsers] = useState<any>();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  const data = props.valueSearch.length === 0 ? users : props.valueSearch;

  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await getAllUsers(null, token);
      setUsers(allUsers);
    };
    fetchData();
  }, [loading]);

  const handleBlock = async (id: number) => {
    const findUser = users.find((user: any) => user.id === id);

    const req = { token, id, status: findUser.status === 1 ? 0 : 1 };
    const block = await changeStatusUser(req);

    setLoading(!loading);
    //* Thông báo
    if ((block as any).status === 200) {
      socket.emit("blockUser", "blockUser!");
      message.success(
        (req as any).status === 1
          ? "Unblock user successfully"
          : "Block user successfully"
      );
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-end">
          <ExportButton slug={"users"} data={data} />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                FullName
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                role
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
            {data?.map((user: any) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <th scope="col" className="px-6 py-3">
                  {user.id}
                </th>
                <td className="px-6 py-4">{user.fullName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role.role}</td>
                <td className="px-6 py-4">
                  {user.status === 0 ? "Bị khóa" : "Hoạt động"}
                </td>

                <td className="px-6 py-4 flex">
                  {user.role.role === 1 ? (
                    <button
                      type="button"
                      className={`text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 ${
                        user.status === 0
                          ? "bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-green-300"
                          : "bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                      }`}
                      onClick={() => handleBlock(user.id)}
                    >
                      {user.status === 0 ? "Unblock" : "Block"}
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableUser;
