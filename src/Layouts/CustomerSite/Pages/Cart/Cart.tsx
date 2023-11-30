import { useEffect, useState } from "react";
import {
  getOneUser,
  getAllCartByUser,
  deleteCartItemByUser,
} from "../../../../API/user";

import { message } from "antd";
import { getAllAddress } from "../../../../API/address";

import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");
import PaypalButton from "../../../AdminSite/Components/PaypalButton";

const Cart = () => {
  const token = localStorage.getItem("accessToken");

  const [address, setAddress] = useState<[]>([]);
  const [addressValue, setAddressValue] = useState<any>(0);
  const [paymentValue] = useState<any>(1);

  const [user, setUser] = useState<any>(null);
  const [cart, setCart] = useState<any>();
  const [paymentId, setPaymentId] = useState<number>(1);

  useEffect(() => {
    //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
    const userCart = async () => {
      const getUser = await getOneUser(token);
      const getAllCart = await getAllCartByUser(token);
      const getAddress = await getAllAddress(token);
      setCart(getAllCart);
      setUser(getUser);
      setAddress(getAddress);
    };
    userCart();
  }, []);

  const totalPricetoLocaleStrings = cart
    ?.reduce(
      (total: number, item: any) =>
        total + item.product.price * item.quantity * item.size.percent,
      0
    )
    .toLocaleString();

  const totalAmount = cart?.reduce(
    (total: number, item: any) =>
      total + item.product.price * item.quantity * item.size.percent,
    0
  );

  const handleDelete = async (id: number) => {
    const deleteCartItem = await deleteCartItemByUser(id);
    if (deleteCartItem) {
      const userCart = async () => {
        const getUser = await getOneUser(token);
        const getAllCart = await getAllCartByUser(token);
        socket.emit("deleteOrderItem", "deleteOrderItem!");
        setCart(getAllCart);
        setUser(getUser);
      };
      userCart();
    }
  };

  const handleCheckout = async () => {
    const paymentId = paymentValue;
    const addressId = addressValue;
    const data = {
      paymentId,
      addressId,
    };
    if (addressId === 0) {
      message.warning("Vui lòng chọn địa chỉ");
      return;
    }

    // Gửi emit khi đặt hàng thành công
    socket.emit("order", "order!");

    message.open({
      type: "success",
      content: "Đặt hàng thành công",
    });
    const userCart = async () => {
      const getUser = await getOneUser(token);
      const getAllCart = await getAllCartByUser(token);
      const getAddress = await getAllAddress(token);
      setCart(getAllCart);
      setUser(getUser);
      setAddress(getAddress);
    };
    userCart();
  };

  const handleCheckoutPaypal = (status: any) => {
    if (status) {
      const userCart = async () => {
        const getUser = await getOneUser(token);
        const getAllCart = await getAllCartByUser(token);
        const getAddress = await getAllAddress(token);
        setCart(getAllCart);
        setUser(getUser);
        setAddress(getAddress);
      };
      userCart();
    }
  };

  const dataPaypal = {
    addressId: +addressValue,
    paymentId,
  };

  return (
    <>
      <div className="h-[160px]"></div>

      {cart?.length > 0 ? (
        <div>
          <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <header className="text-center">
                  <h1 className="text-xl font-bold text-[#d95773] sm:text-3xl">
                    Giỏ hàng
                  </h1>
                </header>
                <div className="mt-8">
                  <ul className="space-y-4">
                    {cart?.map((item: any, index: number) => {
                      const total =
                        item.quantity * item.product.price * item.size.percent;
                      return (
                        <li key={index} className="flex items-center gap-4">
                          <img
                            src={item.product.images[0].src}
                            alt=""
                            className="h-16 w-16 rounded object-cover"
                          />
                          <div>
                            <h3 className="text-sm text-gray-900 w-[350px]">
                              {item.product.name}
                            </h3>
                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <div>
                                <dt className="inline">
                                  Kích cỡ: {item.size.size}
                                </dt>
                              </div>
                            </dl>
                          </div>
                          <div className="flex flex-1 items-center justify-end gap-2">
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                id="Quantity"
                                value={item.quantity}
                                defaultValue={1}
                                className=" h-10 w-24 rounded border-gray-200 sm:text-sm text-center"
                                disabled={true}
                              />
                            </div>
                            <p className="text-red-400 w-[150px]">
                              {total.toLocaleString()} VNĐ
                            </p>
                            <button className="text-gray-600 transition hover:text-red-600">
                              <span className="sr-only">Remove item</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                                onClick={() => {
                                  handleDelete(item.id);
                                }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                    <div className="w-screen  space-y-4">
                      <div className=" mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                        <p className="text-xl font-medium">Thanh toán</p>

                        <div className="">
                          <>
                            <label
                              htmlFor="countries"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Địa chỉ
                            </label>
                            <select
                              value={addressValue}
                              onChange={(event: any) =>
                                setAddressValue(event.target.value)
                              }
                              id="countries"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              <option value="">Choose a country</option>
                              {address?.map((address: any, index: number) => {
                                return (
                                  <option key={index} value={address.id}>
                                    {address.address} - {address.phoneNumber}
                                  </option>
                                );
                              })}
                            </select>
                          </>

                          {/* Total */}
                          <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-900">
                              Tổng cộng
                            </p>
                            <p className="text-2xl font-semibold text-gray-900 text-red-400">
                              {totalPricetoLocaleStrings} VNĐ
                            </p>
                          </div>
                          <div className="flex mt-4">
                            <div>
                              <label>Payment on delivery</label>
                              <input
                                className="ml-2"
                                value={1}
                                onChange={(e) =>
                                  setPaymentId(Number(e.target.value))
                                }
                                checked={paymentId === 1}
                                type="radio"
                              />
                            </div>
                            <div className="ml-3">
                              <label>Pay with paypal</label>
                              <input
                                className="ml-2"
                                value={2}
                                onChange={(e) =>
                                  setPaymentId(Number(e.target.value))
                                }
                                checked={paymentId === 2}
                                type="radio"
                              />
                            </div>
                          </div>
                        </div>
                        {paymentId === 1 ? (
                          <button
                            onClick={handleCheckout}
                            className="mt-4 mb-8 w-full rounded-md bg-pink-400 px-6 py-3 font-medium text-white"
                          >
                            Đặt hàng
                          </button>
                        ) : (
                          <PaypalButton
                            handleCheckoutPaypal={handleCheckoutPaypal}
                            dataPaypal={dataPaypal}
                            amount={Math.round(totalAmount / 24000)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <img
            className="m-auto"
            src="https://i.pinimg.com/originals/2e/ac/fa/2eacfa305d7715bdcd86bb4956209038.png"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Cart;
