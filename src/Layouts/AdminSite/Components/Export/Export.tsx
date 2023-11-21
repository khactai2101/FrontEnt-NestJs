import React from "react";
import * as XLSX from "xlsx";
type Props = {
  data: [];
  slug: string;
};

const ExportButton = (props: Props) => {
  const productExport = (filename: string) => {
    const data = props.data?.map((item: any) => ({
      id: item.id,
      Tên_sản_phẩm: item.name,
      description: item.description,
      brand: item.brand.brand,
      category: item.category.category,
      images: item.images?.map((image: any) => image.src).join(", "),
      price: item.price,
      size: item.size
        ?.map((size: any) => `${size.size} (${size.percent}%)`)
        .join(", "),
      status: item.status,
      stock: item.stock,
    }));
    //chuyen trang thai tu jsonn sang excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    //
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const userExport = (filename: string) => {
    const data = props.data?.map((item: any) => ({
      id: item.id,
      avatar: item.avatar,
      email: item.email,
      fullName: item.fullName,
      addresses: item.addresses
        ?.map((address: any) => address.address)
        .join(", "),
      role: item.role.role,
      status: item.status,
    }));
    //chuyen trang thai tu jsonn sang excel
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const handleExport = () => {
    switch (props.slug) {
      case "products":
        productExport("products");
      case "users":
        userExport("users");
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Export
      </button>
    </div>
  );
};

export default ExportButton;
