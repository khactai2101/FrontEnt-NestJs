import React, { useEffect, useState } from "react";

import {
  createCategories,
  deleteCategories,
  getAllCategories,
  updateCategories,
} from "../../../../API/category";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import Pagination from "../pagination/Pagination";

const TableCategory = (props: any) => {
  const token: string | null = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState<any>(true);
  const [createLoading, setCreateLoading] = useState(false);

  const [id, setId] = useState<any>(null);
  const [category, setCategory] = useState<any>();

  const [openModal, setOpenModal] = useState<string | undefined>();
  const propsModal = { openModal, setOpenModal };
  const [categories, setCategories] = useState<any>([]);
  const listCategories =
    props.valueSearch.length === 0 ? categories : props.valueSearch;

  const [data, setData] = useState<any>();
  const handlePage = (pagination: any) => {
    setData(pagination);
  };
  useEffect(() => {
    const data = async () => {
      const allCategories = await getAllCategories(null, token);
      setCategories(allCategories);
    };
    data();
  }, [loading]);

  const handleAdd = async () => {
    if (id === null) {
      if (createLoading) {
        return; // Nếu đang tạo, không thực hiện lại
      }
      const res = await createCategories(category);
      setLoading(!loading);
      if (res) {
        setCategory("");
        const data = async () => {
          const allCategories = await getAllCategories(null, token);
          setCategories(allCategories);
        };
        data();
        propsModal.setOpenModal(undefined);
      }
      setCreateLoading(false);
    } else {
      const res = await updateCategories(id, category);

      if (res) {
        setCategory("");
        setId(null);
        const data = async () => {
          const allCategories = await getAllCategories(null, token);
          setCategories(allCategories);
        };
        data();
        propsModal.setOpenModal(undefined);
      }
    }
  };

  const handleUpdate = (id: number) => {
    propsModal.setOpenModal("default");
    const item = categories.find((c: any) => c.id === id);
    setCategory(item.category);
    setId(id);
  };

  const handleDelete = async (id: number) => {
    // console.log(id);
    // deleteCategories(id);
    const res = await deleteCategories(id);
    if (res) {
      setCategory("");
      const data = async () => {
        const allCategories = await getAllCategories(null, token);

        setCategories(allCategories);
      };
      data();
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center mb-2">
        <div className="w-[30%]">
          <Button onClick={() => propsModal.setOpenModal("default")}>
            Thêm
          </Button>
          <Modal
            show={propsModal.openModal === "default"}
            onClose={() => propsModal.setOpenModal(undefined)}
          >
            <Modal.Header>Thêm sản phẩm</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <table>
                  <tr>
                    <td>
                      {" "}
                      <div className="mr-20">
                        <div className="mb-2 block">
                          <Label htmlFor="nameProduct" value="Tên sản phẩm" />
                        </div>
                        <TextInput
                          id="nameProduct"
                          value={category}
                          onChange={(event) => setCategory(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
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
                onClick={() => propsModal.setOpenModal(undefined)}
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
                Tên danh mục
              </th>
              <th scope="col" className="px-2 py-3"></th>
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
            {data?.map((categories: any) => (
              <tr
                key={categories.id}
                className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700
                }`}
              >
                <th className="px-2 py-3">{categories.id}</th>
                <td className="px-2 py-3">{categories.category}</td>

                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3">
                  {" "}
                  <button
                    onClick={() => handleDelete(categories.id)}
                    className="text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(categories.id)}
                    className="text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination data={listCategories} handlePage={handlePage} />
      </div>
    </>
  );
};

export default TableCategory;
