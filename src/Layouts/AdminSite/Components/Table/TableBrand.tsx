import React, { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import {
  createBrands,
  deleteBrand,
  getAllBrands,
  updateBrands,
} from "../../../../API/brand";
import Pagination from "../pagination/Pagination";

const TableBrands = (props: any) => {
  const token: string | null = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState<any>(true);

  const [createLoading, setCreateLoading] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

  const [id, setId] = useState<any>(null);
  const [brand, setBrand] = useState<any>();

  const [openModal, setOpenModal] = useState<string | undefined>();
  const propsModal = { openModal, setOpenModal };
  const [brands, setBrands] = useState<any>([]);

  const listBrands =
    props.valueSearch.length === 0 ? brands : props.valueSearch;
  const [data, setData] = useState<any>();

  const handlePage = (pagination: any) => {
    setData(pagination);
  };
  useEffect(() => {
    const data = async () => {
      const allBrands = await getAllBrands(null, token);
      setBrands(allBrands);
    };
    data();
  }, [loading]);

  const handleAddBrand = async () => {
    if (id === null) {
      if (createLoading) {
        return; // Nếu đang tạo, không thực hiện lại
      }
      const res = await createBrands(brand);

      if (res) {
        setBrand("");
        const data = async () => {
          const allBrands = await getAllBrands(null, token);
          setBrands(allBrands);
        };
        data();
        propsModal.setOpenModal(undefined);
      }
      setCreateLoading(false);
    } else {
      const res = await updateBrands(id, brand);

      if (res) {
        setBrand("");
        setId(null);
        const data = async () => {
          const allBrands = await getAllBrands(null, token);
          setBrands(allBrands);
        };
        data();
        propsModal.setOpenModal(undefined);
      }
    }
  };

  const handleUpdate = async (id: number) => {
    propsModal.setOpenModal("default");
    const item = brands.find((c: any) => c.id === id);
    setBrand(item.name);
    setId(id);
  };

  const handleDelete = async (id: number) => {
    // console.log(id);
    // deleteCategories(id);
    const res = await deleteBrand(id);
    if (res) {
      setBrand("");
      const data = async () => {
        const allBrands = await getAllBrands(null, token);
        setBrands(allBrands);
      };
      data();
    }
  };

  // Hàm xóa sản phẩm

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
            <Modal.Header>Thêm Thương Hiệu</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <table>
                  <tr>
                    <td>
                      {" "}
                      <div className="mr-20">
                        <div className="mb-2 block">
                          <Label
                            htmlFor="nameProduct"
                            value="Tên thương hiệu"
                          />
                        </div>
                        <TextInput
                          id="nameProduct"
                          value={brand}
                          onChange={(event) => setBrand(event.target.value)}
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
              <Button onClick={handleAddBrand}>
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
                Tên Thương hiệu
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
            {data?.map((brand: any) => (
              <tr
                key={brand.id}
                className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700
                }`}
              >
                <th className="px-2 py-3">{brand.id}</th>
                <td className="px-2 py-3">{brand.name}</td>

                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3"></td>
                <td className="px-2 py-3">
                  {" "}
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(brand.id)}
                    className="text-white font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-red-300"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination data={listBrands} handlePage={handlePage} />
      </div>
    </>
  );
};

export default TableBrands;
