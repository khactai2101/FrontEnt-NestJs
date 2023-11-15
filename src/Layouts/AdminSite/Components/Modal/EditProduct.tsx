import React, { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";

interface EditModal {
  getProduct: any;
  handleOk: any;
}
const EditProduct: React.FC<EditModal> = ({ getProduct, handleOk }) => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const [productName, setProductName] = useState<any>();
  const [productCategory, setProductCategory] = useState<any>();
  const [productBrand, setProductBrand] = useState<any>();
  const [productPrice, setProductPrice] = useState<any>();
  const [productDescription, setProductDescription] = useState<any>();
  const [productImage1, setProductImage1] = useState<any>();
  const [productImage2, setProductImage2] = useState<any>();
  const [productImage3, setProductImage3] = useState<any>();
  const [productStock, setProductStock] = useState<any>();
  const [productProvider, setProductProvider] = useState<any>();

  const handleEdit = () => {
    const updateProduct = {
      name: productName ? productName : getProduct.name,
      price: productPrice ? productPrice : getProduct.price,
      description: productDescription
        ? productDescription
        : getProduct.description,
      brand: productBrand ? productBrand : getProduct.brand,
      provider: productProvider ? productProvider : getProduct.provider,
      category: productCategory ? productCategory : getProduct.category,
      stock: productStock ? productStock : getProduct.stock,
      images: [
        {
          id: 1,
          url: productImage1 ? productImage1 : getProduct.images[0].url,
        },
        {
          id: 2,
          url: productImage2 ? productImage1 : getProduct.images[1].url,
        },
        {
          id: 3,
          url: productImage3 ? productImage1 : getProduct.images[2].url,
        },
      ],
    };

    axios.patch(
      `http://localhost:8080/product/${getProduct.id}`,
      updateProduct
    );

    handleOk();

    setOpenModal(undefined);
  };

  return (
    <div className="w-[30%]">
      <Button onClick={() => props.setOpenModal("default")}>Sửa</Button>
      <Modal
        show={props.openModal === "default"}
        onClose={() => props.setOpenModal(undefined)}
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
                      defaultValue={getProduct.name}
                      onChange={(event) => setProductName(event.target.value)}
                      placeholder=""
                      required
                      type="text"
                      className="w-[250px]"
                    />
                  </div>
                </td>
                <td>
                  {" "}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="nameCategory" value="Tên danh mục" />
                    </div>
                    <TextInput
                      id="nameCategory"
                      defaultValue={getProduct.category}
                      onChange={(event) =>
                        setProductCategory(event.target.value)
                      }
                      placeholder=""
                      required
                      type="text"
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
                      <Label htmlFor="nameBrand" value="Tên thương hiệu" />
                    </div>
                    <TextInput
                      id="nameBrand"
                      defaultValue={getProduct.brand}
                      onChange={(event) => setProductBrand(event.target.value)}
                      placeholder=""
                      required
                      type="text"
                      className="w-[250px]"
                    />
                  </div>
                </td>
                <td>
                  {" "}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="price" value="Giá" />
                    </div>
                    <TextInput
                      id="price"
                      defaultValue={getProduct.price}
                      onChange={(event) => setProductPrice(event.target.value)}
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
                      defaultValue={getProduct.description}
                      onChange={(event) =>
                        setProductDescription(event.target.value)
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
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="image" value="Ảnh 1" />
                    </div>
                    <TextInput
                      id="image"
                      defaultValue={getProduct.images[0].url}
                      onChange={(event) => setProductImage1(event.target.value)}
                      placeholder=""
                      required
                      type="text"
                      className="w-[250px]"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="image2" value="Ảnh 2" />
                    </div>
                    <TextInput
                      id="image2"
                      defaultValue={getProduct.images[1].url}
                      onChange={(event) => setProductImage2(event.target.value)}
                      placeholder=""
                      required
                      type="text"
                      className="w-[250px]"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="image3" value="Ảnh 3" />
                    </div>
                    <TextInput
                      id="image3"
                      defaultValue={getProduct.images[2].url}
                      onChange={(event) => setProductImage3(event.target.value)}
                      placeholder=""
                      required
                      type="text"
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
                      <Label htmlFor="stock" value="Số lượng kho" />
                    </div>
                    <TextInput
                      id="stock"
                      defaultValue={getProduct.stock}
                      onChange={(event) => setProductStock(event.target.value)}
                      placeholder=""
                      required
                      type="number"
                      className="w-[250px]"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="provider" value="Nhà cung cấp" />
                    </div>
                    <TextInput
                      id="provider"
                      defaultValue={getProduct.provider}
                      onChange={(event) =>
                        setProductProvider(event.target.value)
                      }
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
          <Button onClick={handleEdit}>Sửa</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProduct;
