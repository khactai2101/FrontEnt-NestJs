import { Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneProduct } from "../../../../API";
import { addToCart, getAllCartByUser, updateCart } from "../../../../API/user";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");

import { message } from "antd";

const Product = () => {
  const token = localStorage.getItem("accessToken");

  const [products, setProducts] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [percent, setPercent] = useState<any>();
  const { id } = useParams();
  const [sizeId, setSizeId] = useState(null);
  const [active, setActive] = useState<any>({});
  const [cart, setCart] = useState<any>();

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    const handleGetOne = async () => {
      const idFromParams = Number(id);
      const getOneProducts = await getOneProduct(idFromParams);
      const getAllCart = await getAllCartByUser(token);
      setProducts(getOneProducts);
      setActive(getOneProducts?.size[0]);
      setCart(getAllCart);
      setSizeId(getOneProducts?.size[0].id);
    };
    handleGetOne();
  }, []);

  const handlNewPrice = async (item: any) => {
    setPercent(item.percent);
    setSizeId(item.id);
    setActive(item);
  };

  const handleAddToCart = async () => {
    const productId = Number(id);
    const dataCart = {
      productId,
      sizeId,
      quantity,
    };
    // Kiểm tra xem số lượng đặt hàng có vượt quá số lượng trong kho hay không
    if (quantity > products.stock) {
      message.error("Số lượng đặt hàng vượt quá số lượng trong kho");
      return;
    }

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng
    const isProductInCart = cart.find((item: any) => {
      return item.product.id === productId && item.size.id === sizeId;
    });

    if (isProductInCart) {
      const updateCartUser = await updateCart(isProductInCart.id, {
        quantity: isProductInCart.quantity + quantity,
      });
      // Hiển thị thông báo rằng sản phẩm đã tồn tại
      if (updateCartUser) {
        const getAllCart = await getAllCartByUser(token);
        setCart(getAllCart);
        message.success("Đã cập nhật giỏ hàng");
      }
    } else {
      // Thêm sản phẩm vào giỏ hàng
      const apiCart = await addToCart(dataCart, { dataToken: token });
      if (apiCart) {
        const getAllCart = await getAllCartByUser(token);
        setCart(getAllCart);
      }
      message.success("Thêm giỏ hàng thành công");
      // Gửi emit khi đặt hàng thành công
      socket.emit("order", "order!");
    }
  };

  const percentTotal = active?.percent / 100;
  const pricePercent = percentTotal * products?.price;
  const priceTotal = pricePercent + products?.price;
  const total = products !== undefined && priceTotal * quantity;

  return (
    <>
      <div className="h-[160px]"></div>
      <section className="text-gray-700 body-font overflow-hidden bg-[#ECECEC] py-3">
        <div className="container px-5 py-24 mx-auto bg-white">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Carousel className="lg:w-1/2 w-full object-cover h-[500px] object-center rounded border border-gray-200">
              <img
                alt="..."
                src={products?.images[0]?.src}
                className="object-cover w-full h-full"
              />
              <img
                alt="..."
                src={products?.images[1]?.src}
                className="object-cover w-full h-full"
              />
              <img
                alt="..."
                src={products?.images[2]?.src}
                className="object-cover w-full h-full"
              />
            </Carousel>

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {products?.brand.name}
              </h2>

              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {products?.name}
              </h1>

              <p className="leading-relaxed">
                <span className="font-bold">{products?.name} </span>
                {products?.description}
              </p>
              <div className="flex">
                <span className="mr-3">Số lượng:</span>
                <span className="mr-3 text-red-400">{products?.stock}</span>
              </div>

              <div className="flex mt-6 items-center pb-3 border-b-2 border-gray-200 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Kích cỡ</span>

                  <div className="relative ">
                    {products?.size?.map((item: any) => {
                      const sizeName = item.size;

                      return (
                        <button
                          onClick={() => {
                            handlNewPrice(item);
                          }}
                          key={item.id}
                          className={`focus:ring-red-100 dark:focus:ring-red-400 focus:ring-4 focus:outline-none relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 `}
                        >
                          <span
                            className={`relative px-4 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover-bg-opacity-0  ${
                              item.id === active.id
                                ? "bg-pink-300 text-white"
                                : "bg-white"
                            }`}
                          >
                            {sizeName}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleDecrement}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    id="Quantity"
                    value={quantity}
                    defaultValue={1}
                    disabled={true}
                    className="h-10 w-24 rounded border-gray-200 sm:text-sm text-center"
                  />
                  <button
                    type="button"
                    className="h-10 w-10 leading-10 text-gray-600 transition hover:opacity-75"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-red-400">
                  {total.toLocaleString()}
                  VNĐ
                </span>
                <button
                  onClick={handleAddToCart}
                  className="flex ml-auto text-white bg-pink-300 border-0 py-2 px-6 focus:outline-none hover:bg-pink-400 rounded transition-colors duration-500"
                >
                  Thêm vào giỏ hàng
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
