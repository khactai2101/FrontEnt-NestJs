import React, { useEffect, useMemo, useState } from "react";
import {
  getAllHistoryByUser,
  updateHistoryOrder,
} from "../../../../API/historyOrder";
import { Divider } from "antd";

const HistoryOrder = () => {
  const [historyOrder, setHistoryOrder] = useState<any>();
  const [update, setUpdate] = useState<any>(false);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const data = async () => {
      const allHistoryByUser = await getAllHistoryByUser(token);

      setHistoryOrder(allHistoryByUser);
    };
    data();
  }, [update]);

  const calculateTotal = (order: any) => {
    return order.orderItems.reduce((total: any, item: any) => {
      const price = item.product.price;
      const quantity = item.quantity;
      const percent = item.size.percent;
      return total + price * quantity * percent;
    }, 0);
  };

  const handleUpdate = async (id: number) => {
    const updateStatusOrder = await updateHistoryOrder(id, 2);
    if (updateStatusOrder) {
      // const data = async () => {
      //   const allHistoryByUser = await getAllHistoryByUser(token);
      //   setHistoryOrder(allHistoryByUser);
      // };
      // data();
      setUpdate(!update);
    }
  };

  return (
    <>
      {historyOrder?.length > 0 ? (
        <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="flex justify-start item-start space-y-2 flex-col">
            <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
              Order #13432
            </h1>
            <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
              21st Mart 2021 at 10:34 PM
            </p>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full px-5 space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  Lịch sử mua hàng
                </p>
                {historyOrder?.map((item: any, index: number) => {
                  const total = calculateTotal(item);
                  return (
                    <div
                      key={index}
                      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                    >
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            #{item.codeOrder}
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Địa chỉ:{" "}
                              </span>{" "}
                              {item.address.address}
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Phương thức thanh toán:{" "}
                              </span>{" "}
                              {item.paymentId === 1 ? "Ship COD" : "Thẻ"}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-red-300 dark:text-white xl:text-lg leading-6">
                            {total.toLocaleString()} VNĐ
                          </p>
                          <p className="text-red-300 dark:text-white xl:text-lg leading-6">
                            {item.status === 1
                              ? "Đang chờ xác nhận"
                              : item.status === 2
                              ? "Đã hủy"
                              : item.status === 3
                              ? "Đã xác nhận"
                              : item.status === 4
                              ? "Đang giao"
                              : "Đã giao"}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            {item.status === 1 && (
                              <button
                                id={item.id}
                                className="bg-transparent hover:bg-red-500 text-red-300  hover:text-black py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                onClick={() => handleUpdate(item.id)}
                              >
                                Hủy
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Shipping Address
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        180 North King Street, Northhampton MA 1060
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Billing Address
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        180 North King Street, Northhampton MA 1060
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div>
          <div className="h-[28vh] "></div>
          <img
            className="m-auto"
            src="https://png.pngtree.com/png-vector/20230124/ourmid/pngtree-order-now-banner-for-promotion-of-your-business-png-image_6565761.png"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default HistoryOrder;
