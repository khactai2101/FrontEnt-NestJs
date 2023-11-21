import React, { useEffect, useState } from "react";
import { IProduct } from "../../../../Types/type";
import {
  BlockProducts,
  createProduct,
  createProductSize,
  deleteProductSize,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../../../../API";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { message } from "antd";
import { getAllSize } from "../../../../API/size";
import { getAllCategories } from "../../../../API/category";
import { getAllBrands } from "../../../../API/brand";
import Pagination from "../pagination/Pagination";
import ExportButton from "../Export/Export";
import LoadingComponent from "../LoadingComponent";

const TableProduct = (props: any) => {
  const token: string | null = localStorage.getItem("accessToken");
  const [loading, setLoading] = useState<any>(true);
  const [name, setName] = useState<any>("");
  const [category, setCategory] = useState<any>([]);
  const [brand, setBrand] = useState<any>([]);
  const [price, setPrice] = useState<any>(0);
  const [description, setDescription] = useState<any>("");
  const [brandValue, setBrandValue] = useState<any>(0);
  const [categoryValue, setCategoryValue] = useState<any>(0);
  const [stock, setStock] = useState<any>(0);
  const [fileImage, setFileImage] = useState<any>([]);
  const [sizeValue, setSizeValue] = useState<any>([]);
  const [sizeAddnewValue, setAddSizeValue] = useState<any>([]);
  const [checkId, setCheckId] = useState<any>(null);
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const propsModal = { openModal, setOpenModal };
  const [products, setProducts] = useState<any>([]);
  const [size, setSizes] = useState([]);
  const [spinnerLoading, setSpinnerLoading] = useState(true);
  const listProducts =
    props.valueSearch?.length === 0 ? products : props.valueSearch;
  const [data, setData] = useState<any>();

  const handlePage = (pagination: any) => {
    setData(pagination);
  };

  // const clearInputFields = () => {
  //   setName("");
  //   setBrandValue(0);
  //   setPrice(0);
  //   setDescription("");
  //   setStock(0);
  //   setFileImage([]);
  //   setSizeValue([]);
  //   setCategoryValue(0);
  //   setAddSizeValue([]);
  //   // Thêm các state khác cần reset nếu có
  // };

  useEffect(() => {
    const token: string | null = localStorage.getItem("accessToken");

    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
    const data = async () => {
      const allProducts = await getAllProducts(null);
      const allSizes = await getAllSize(null, token);
      const allCategory = await getAllCategories(null, token);
      const allBrands = await getAllBrands(null, token);
      setProducts(allProducts);
      setSizes(allSizes);
      setCategory(allCategory);
      setBrand(allBrands);
      setSpinnerLoading(false);
    };
    data();
  }, [loading]);

  const handleCheckboxChange = async (id: number) => {
    const updateCheckSize = [...sizeValue];

    const isAllNumber = updateCheckSize.every((value: number) =>
      Number.isFinite(value)
    );

    if (isAllNumber) {
      const index = updateCheckSize.indexOf(id);
      if (index !== -1) {
        // Nếu id đã tồn tại, loại bỏ nó
        updateCheckSize.splice(index, 1);
        setSizeValue(updateCheckSize);
      } else {
        if (checkId !== null) {
          const res = await createProductSize({
            productsId: checkId,
            sizesId: id,
          });
          if (res) {
            const data = await getOneProduct(checkId);
            setCheckId(data.id);
            setName(data.name);
            setBrandValue(data.brandId);
            setPrice(data.price);
            setDescription(data.description);
            setStock(data.stock);
            setFileImage(data.images);
            setSizeValue(data.size);
            setCategoryValue(data.categoryId);
          }
        }
      }
    } else {
      const index = updateCheckSize.find((item) => {
        return item.id === id;
      });

      if (index) {
        const res = await deleteProductSize(checkId, index.id);

        if (res.status === 200) {
          const data = await getOneProduct(checkId);
          setCheckId(data.id);
          setName(data.name);
          setBrandValue(data.brandId);
          setPrice(data.price);
          setDescription(data.description);
          setStock(data.stock);
          setFileImage(data.images);
          setSizeValue(data.size);
          setCategoryValue(data.categoryId);
        }
      } else {
        const res = await createProductSize({
          productsId: checkId,
          sizesId: id,
        });
        if (res) {
          const data = await getOneProduct(checkId);
          setCheckId(data.id);
          setName(data.name);
          setBrandValue(data.brandId);
          setPrice(data.price);
          setDescription(data.description);
          setStock(data.stock);
          setFileImage(data.images);
          setSizeValue(data.size);
          setCategoryValue(data.categoryId);
        }
      }
    }
  };

  const handleAddnewCheckboxChange = (id: any) => {
    const updateCheckSize = [...sizeAddnewValue];
    const sizeIndex = updateCheckSize.findIndex((item) => {
      return item === id;
    });

    if (sizeIndex !== -1) {
      updateCheckSize.splice(sizeIndex, 1);
    } else {
      updateCheckSize.push(id);
    }
    setAddSizeValue(updateCheckSize);
  };

  const handleAdd = async () => {
    setSpinnerLoading(true);
    if (checkId === null) {
      const data = {
        name,
        brandId: brandValue,
        categoryId: categoryValue,
        price,
        description,
        stock,
        images: fileImage,
        size: JSON.stringify(sizeAddnewValue),
      };

      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      for (let img of fileImage) formData.append("images", img);
      const res = await createProduct(formData);
      if (res.success) {
        const allProducts = await getAllProducts(null);
        setProducts(allProducts);
        setOpenModal(undefined);
        setName("");
        setBrandValue(0);
        setPrice(0);
        setDescription("");
        setStock(0);
        setFileImage([]);
        setSizeValue([]);
        setCategoryValue(0);
        setSpinnerLoading(false);

        message.success("Product created successfully");
      }
    } else {
      const data = {
        name,
        brandId: brandValue,
        categoryId: categoryValue,
        price,
        description,
        stock,
      };
      const res = await updateProduct(checkId, data);
      if (res.affected === 1) {
        const allProducts = await getAllProducts(null);
        setProducts(allProducts);
        setOpenModal(undefined);
        setSpinnerLoading(false);
        message.success("Update Product successfully");
      }
    }
  };
  const handleUpdate = async (id: number) => {
    propsModal.setOpenModal("default");
    const res = await getOneProduct(id);
    setCheckId(id);
    setName(res.name);
    setBrandValue(res.brandId);
    setPrice(res.price);
    setDescription(res.description);
    setStock(res.stock);
    setFileImage(res.images);
    setSizeValue(res.size);
    setCategoryValue(res.categoryId);
  };

  const blockProducts = (id: any) => {
    const itemProduct = products.find((p: any) => p.id === id);
    const req = { token, id, status: itemProduct.status === 1 ? 0 : 1 };
    const data = async () => {
      const response = await BlockProducts(req);

      setLoading(!loading);

      if (itemProduct.status === 1) {
        message.success("Blocked Product");
      } else if (itemProduct.status === 0) {
        message.warning("Unblocked Product");
      }
    };
    data();
  };

  return (
    <>
      {spinnerLoading ? <LoadingComponent /> : null}
      <div className="flex gap-4 items-center mb-2">
        <div className="w-full">
          <div className="flex justify-between">
            <Button onClick={() => propsModal.setOpenModal("default")}>
              Thêm
            </Button>
            <ExportButton slug={"products"} data={data} />
          </div>

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
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      <>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tên thương hiệu
                        </label>
                        <select
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={brandValue}
                          onChange={(event: any) =>
                            setBrandValue(+event.target.value)
                          }
                        >
                          <option selected={true}>Choose a brand</option>
                          {brand?.map((brand: any, index: number) => {
                            return (
                              <option key={index} value={brand.id}>
                                {brand.name}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <>
                        <label
                          htmlFor="countries"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Tên danh mục
                        </label>
                        <select
                          id="countries"
                          value={categoryValue}
                          onChange={(e) => setCategoryValue(+e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option selected={true}>Choose option</option>
                          {category?.map((category: any, index: number) => {
                            return (
                              <option key={index} value={category.id}>
                                {category.category}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    </td>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="price" value="Giá" />
                        </div>
                        <TextInput
                          id="price"
                          value={price}
                          onChange={(event) => setPrice(event.target.value)}
                          placeholder=""
                          required
                          type="number"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="description" value="Mô tả" />
                        </div>
                        <TextInput
                          id="description"
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                          placeholder=""
                          required
                          type="text"
                          className="w-[250px]"
                        />
                      </div>
                    </td>
                    <td>
                      {" "}
                      {checkId === null ? (
                        <>
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="file_input"
                          >
                            Upload file
                          </label>
                          <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            multiple
                            onChange={(e) => setFileImage(e.target.files)}
                          />
                        </>
                      ) : (
                        <>
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="file_input"
                          >
                            Image Product
                          </label>
                          <div className="flex">
                            {fileImage?.map((image: any, index: number) => {
                              return (
                                <img
                                  className="w-[70px] ml-2 border border-collapse"
                                  key={index}
                                  src={`${image.src}`}
                                  alt=""
                                />
                              );
                            })}
                          </div>
                        </>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {" "}
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="stock" value="Số lượng kho" />
                        </div>
                        <TextInput
                          id="stock"
                          value={stock}
                          onChange={(event) => setStock(event.target.value)}
                          placeholder=""
                          required
                          type="number"
                          className="w-[250px]"
                        />
                      </div>
                    </td>

                    <td>
                      {checkId !== null ? (
                        <div>
                          {size?.map((size: any, index: number) => {
                            const sizeSelected = sizeValue?.some(
                              (selectedItem: any) => selectedItem.id === size.id
                            );

                            return (
                              <div
                                key={index}
                                className="inline-flex items-center"
                              >
                                <label
                                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                                  htmlFor="login"
                                  data-ripple-dark="true"
                                >
                                  <input
                                    value={size.id}
                                    onChange={() =>
                                      handleCheckboxChange(size.id)
                                    }
                                    type="checkbox"
                                    checked={sizeSelected}
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                  />
                                </label>
                                <label
                                  className="mt-px font-light text-gray-700 cursor-pointer select-none"
                                  htmlFor="login"
                                >
                                  {size.size}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          {size?.map((size: any, index: number) => {
                            return (
                              <div
                                key={index}
                                className="inline-flex items-center"
                              >
                                <label
                                  className="relative flex items-center p-3 rounded-full cursor-pointer"
                                  htmlFor="login"
                                  data-ripple-dark="true"
                                >
                                  <input
                                    value={size.id}
                                    onChange={() =>
                                      handleAddnewCheckboxChange(size.id)
                                    }
                                    type="checkbox"
                                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                  />
                                </label>
                                <label
                                  className="mt-px font-light text-gray-700 cursor-pointer select-none"
                                  htmlFor="login"
                                >
                                  {size.size}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* size */}
                    </td>
                  </tr>
                  <tr></tr>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleAdd}>Thêm</Button>
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
                Tên sản phẩm
              </th>
              <th scope="col" className="px-2 py-3">
                Ảnh
              </th>
              <th scope="col" className="px-2 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-2 py-3">
                Thương hiệu
              </th>
              <th scope="col" className="px-2 py-3">
                Giá
              </th>
              <th scope="col" className="px-2 py-3">
                Số lượng kho
              </th>
              <th scope="col" className="px-2 py-3">
                Size
              </th>
              <th scope="col" className="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product: any, index: number) => (
              <tr
                key={index}
                className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700 ${
                  product.status === 0 ? "text-line-through" : ""
                }`}
              >
                <th className="px-2 py-4">{product.id}</th>
                <td className="w-13 pr-5">{product.name}</td>
                <td className="w-20">
                  <img src={product?.images[0]?.src} width={50} height={50} />
                </td>
                <td className="w-25 p-2">{product?.description}</td>
                <td className="px-3 py-4">{product?.brand?.name}</td>
                <td className="w-[100px] text-red-500">
                  {Number(product?.price).toLocaleString()} VNĐ
                </td>

                <td className="px-5  py-4">{product?.stock}</td>
                <td className="px-3 py-4">
                  {product?.size?.map((item: any, index: number) => {
                    return index === product?.size?.length - 1 ? (
                      <a key={item.id} style={{ marginLeft: 10 }}>
                        {item.size}
                      </a>
                    ) : (
                      <a key={item.id} style={{ marginLeft: 10 }}>
                        {item.size},
                      </a>
                    );
                  })}
                </td>

                <td className="px-2 py-4 flex gap-1">
                  <button
                    onClick={() => handleUpdate(product.id)}
                    className=" text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`text-white ${
                      product.status === 0
                        ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                        : "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                    } hover:bg-gradient-to-br focus:ring-4 focus:outline-none ${
                      product.status === 0
                        ? "focus:ring-green-300"
                        : "focus:ring-red-300"
                    } dark:focus:ring-red-800 shadow-lg ${
                      product.status === 0
                        ? "shadow-green-500/50"
                        : "shadow-red-500/50"
                    } dark:shadow-lg ${
                      product.status === 0
                        ? "dark:shadow-green-800/80"
                        : "dark:shadow-red-800/80"
                    } font-medium rounded-lg text-xs px-3 py-1.5 text-center mr-2 mb-2`}
                    onClick={() => blockProducts(product.id)}
                  >
                    {product.status === 0 ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination data={listProducts} handlePage={handlePage} />
      </div>
    </>
  );
};

export default TableProduct;
