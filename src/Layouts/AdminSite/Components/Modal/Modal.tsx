"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

export default function DefaultModal() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <div className="w-[30%]">
      <Button onClick={() => props.setOpenModal("default")}>Thêm</Button>
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
                      <Label htmlFor="description" value="Mô tả" />
                    </div>
                    <TextInput
                      id="description"
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
                      <Label htmlFor="image" value="Ảnh" />
                    </div>
                    <TextInput
                      id="image"
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
                      <Label htmlFor="quantity" value="Số lượng" />
                    </div>
                    <TextInput
                      id="quantity"
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
          <Button onClick={() => props.setOpenModal(undefined)}>Thêm</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
