import { useEffect, useState } from "react";

import { Button, Modal } from "flowbite-react";
import {
  createSize,
  deleteSize,
  getAllSize,
  updateSize,
} from "../../../../API/size";

const TableSize = () => {
  const token: string | null = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState<any>(true);
  const [createLoading, setCreateLoading] = useState(false);

  const [id, setId] = useState<any>(null);
  const [size, setSize] = useState<any>();
  const [percent, setPercent] = useState<any>();

  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const [sizes, setSizes] = useState<any>([]);

  useEffect(() => {
    const data = async () => {
      const allSizes = await getAllSize(null, token);
      setSizes(allSizes);
    };
    data();
  }, [loading]);
  console.log(size);

  const handleAdd = async () => {
    if (id === null) {
      if (createLoading) {
        return; // Nếu đang tạo, không thực hiện lại
      }
      const data = { size, percent };
      const res = await createSize(data);
      if (res) {
        setSize("");
        setPercent("");
        const data = async () => {
          const allSizes = await getAllSize(null, token);
          setSizes(allSizes);
        };
        data();
        props.setOpenModal(undefined);
      }
      setCreateLoading(false);
    } else {
      const data = { size, percent };

      const res = await updateSize(id, data);
      if (res) {
        setSize("");
        setPercent("");
        setId(null);
        const data = async () => {
          const allSizes = await getAllSize(null, token);
          setSizes(allSizes);
        };
        data();
        props.setOpenModal(undefined);
      }
    }
  };

  const handleUpdate = (id: number) => {
    props.setOpenModal("default");
    const item = sizes.find((c: any) => c.id === id);
    setSize(item.size);
    setPercent(item.percent);
    setId(id);
  };

  const handleDelete = async (id: number) => {
    const res = await deleteSize(id);
    if (res) {
      setSize("");
      setPercent("");
      const data = async () => {
        const allSizes = await getAllSize(null, token);
        setSizes(allSizes);
      };
      data();
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center mb-2">
        <div className="w-[30%]">
          <Button onClick={() => props.setOpenModal("default")}>Thêm</Button>
          <Modal
            show={props.openModal === "default"}
            onClose={() => props.setOpenModal(undefined)}
          >
            <Modal.Header>Thêm size</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <table>
                  <tr>
                    <td className="flex">
                      {" "}
                      <>
                        <div className="relative flex gap-11">
                          <div>
                            <input
                              type="text"
                              id="floating_helper"
                              aria-describedby="floating_helper_text"
                              className="block rounded-t-lg px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                            />
                            <label
                              htmlFor="floating_helper"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 top-3 -translate-y-1/2 scale-75 left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                            >
                              Size
                            </label>
                          </div>
                          <div>
                            <input
                              type="number"
                              id="floating_helper"
                              aria-describedby="floating_helper_text"
                              className="block rounded-t-lg px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder=" "
                              value={percent}
                              onChange={(e) =>
                                setPercent(parseInt(e.target.value))
                              }
                            />
                            <label
                              htmlFor="floating_helper"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 top-3 -translate-y-1/2 scale-75 right-3.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                            >
                              Percent
                            </label>
                          </div>
                        </div>
                      </>
                    </td>
                  </tr>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleAdd}>
                {id === null ? "Thêm" : "Sửa"}
              </Button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                ID
              </th>
              <th scope="col" className="px-2 py-3">
                Size
              </th>
              <th scope="col" className="px-2 py-3">
                percent
              </th>
              <th scope="col" className="px-2 py-3"></th>
              <th scope="col" className="px-2 py-3"></th>
              <th scope="col" className="px-2 py-3"></th>
              <th scope="col" className="px-2 py-3">
                {" "}
                Action
              </th>
              <th scope="col" className="px-2 py-3"></th>
              <th scope="col" className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sizes?.map((sizes: any) => (
              <tr
                key={sizes.id}
                className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700
                }`}
              >
                <th className="px-2 py-3">{sizes.id}</th>
                <td className="px-2 py-3">{sizes.size}</td>

                <td className="px-2 py-3">{sizes.percent}%</td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3">
                  {" "}
                  <button
                    onClick={() => handleDelete(sizes.id)}
                    className="text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(sizes.id)}
                    className="text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableSize;
