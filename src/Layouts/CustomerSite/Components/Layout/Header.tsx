import React, { useEffect, useState } from "react";
import logo from "../../../../assets/images/REMO-Tach nen.png";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../../../../Types/type";
import {
  getAllCartByUser,
  getAllUsers,
  getOneUser,
} from "../../../../API/user";
import { BsCartPlus } from "react-icons/Bs";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Avatar, Dropdown } from "flowbite-react";
import { getAllProducts } from "../../../../API";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");

function Header(props: any) {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [value, setValue] = useState<string>("");
  const [users, setUsers] = useState<any>([]);
  const [isCheck, setIsCheck] = useState(token);
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);
  const [valueSearch, setValueSearch] = useState<any>([]);
  const [cart, setCart] = useState<any>();

  // useEffect(() => {
  //   //goi api dde thuc hien chuc nang hien thi tat ca cac san pham
  //   const data = async () => {
  //     const token: any = localStorage.getItem("accessToken");
  //     // const decoded = jwtDecode(token);
  //     const cart = async () => {
  //       const getAllCart = await getAllCartByUser(token);
  //       setCart(getAllCart);
  //     };
  //     cart();
  //     const oneUser = await getOneUser(token);
  //     const allProducts = await getAllProducts(null);
  //     setProducts(allProducts);
  //     setUsers(oneUser);

  //     // Sử dụng TypeScript để xác định kiểu dữ liệu của prevLoading
  //     // setLoading((prevLoading: boolean) => !prevLoading);
  //   };

  //   data();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      const oneUser = await getOneUser(token);
      const allProducts = await getAllProducts(null);
      setProducts(allProducts);
      setUsers(oneUser);

      const getAllCart = await getAllCartByUser(token);
      setCart(getAllCart);

      socket.on("order", handleOrderEvent);
      // socket.on("deleteOrderItem", handleDeleteOrderItemEvent);
      socket.on("blockUser", handleBlockUserEvent);

      socket.on("deleteOrderItem", handleOrderEvent);

      return () => {
        socket.off("order", handleOrderEvent);
        // socket.off("deleteOrderItem", handleDeleteOrderItemEvent);
        socket.off("blockUser", handleBlockUserEvent);

        socket.off("deleteOrderItem", handleOrderEvent);
      };
    };

    fetchData();
  }, [token]);
  const handleBlockUserEvent = () => {
    const blockUser = async () => {
      localStorage.removeItem("accessToken");
      navigate("/login");
    };
    blockUser();
  };
  const handleOrderEvent = () => {
    const cart = async () => {
      const getAllCart = await getAllCartByUser(token);
      setCart(getAllCart);
    };
    cart();
  };

  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [dataSearch, setDataSearch] = useState<any>();

  const handleInputClick = (e: any) => {
    if (e.target.value.length > 0) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    const searchProduct = products?.filter((item: any) =>
      item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    setDataSearch(searchProduct);
  };
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
    setIsCheck(null);
  };
  const closeFormSmall = () => {
    // Close the search results form
    setIsHidden(false);
  };

  return (
    <div>
      {" "}
      <header className="header">
        {/* top */}
        <div className="header-moving">
          <div className="header-wrapper-top">
            <div className="header-top">
              <div className="header-top__left ml-6">
                <p>REMO - Dịch Vụ Cung Cấp Hộp Quà Bí Ẩn Cho Trẻ Em</p>
              </div>
              <div className="header-top__right">
                <ul className="header-contact">
                  <li className="header-contact__email">
                    <a href="#">
                      <i className="bx bx-envelope" />
                      <span>nguyenkhactai1@gmail.com</span>
                    </a>
                  </li>
                  <li className="header-contact__phone">
                    <a href="#">
                      <i className="bx bx-phone" />
                      <span>024.66.737.999</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* main */}
          <div className="header-wapper-main">
            <div className="container">
              <div className="header-main__left   ">
                <Link to="/">
                  <img src={logo} alt="" className="w-[100px] ml-[150px]" />
                </Link>
              </div>
              <div className="header-main__mid">
                <div className="input-search mt-2">
                  <input
                    type="text"
                    id="search-value"
                    placeholder="Nhập từ khóa tìm kiếm"
                    onChange={handleInputClick}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass fa-xl"
                    style={{ color: "#fff" }}
                  />
                  <div
                    className={` ${
                      isHidden === false
                        ? "hiddenFormSmall"
                        : "form-search-small "
                    } `}
                  >
                    {isHidden === false ? (
                      ""
                    ) : dataSearch?.length > 0 ? (
                      dataSearch?.map((item: any) => {
                        return (
                          <Link to={`/product/${item.id}`}>
                            <div
                              className="item-search flex gap-2 p-3 items-center"
                              onClick={closeFormSmall}
                            >
                              <img
                                className="w-[80px] h-[80px]"
                                src={`${item.images[0].src}`}
                                alt=""
                              />

                              <div className="item-search-name ">
                                <p id="name-search ">{item.name}</p>
                                <p id="price-search" className="text-red-500">
                                  {item.price.toLocaleString()} VNĐ
                                </p>
                              </div>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <p className=" pt-5 pl-[110px]">
                        Không có sản phẩm đang tìm kiếm{" "}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="header-main__right">
                <div className="user-account">
                  <div className="account-username">
                    <a href="./html/profile-user.html">
                      <p id="username" />
                    </a>
                  </div>
                  <div className="cart">
                    <a href="./html/cart.html">
                      <i
                        className="bx bx-cart"
                        style={{ color: "#fd95aa", fontSize: 35 }}
                      />
                    </a>
                  </div>
                  {isCheck == null ? (
                    <>
                      <button className="login">
                        <Link to="/login">Đăng nhập</Link>
                      </button>
                      <button className="register">
                        <Link to="/register" id="signup">
                          Đăng ký
                        </Link>
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        className="flex gap-2"
                        style={{ alignItems: "center" }}
                      >
                        <NavLink to="/cart">
                          <div className="relative z-0">
                            <BsCartPlus size="30px" />
                            {cart?.length > 0 && (
                              <span className="absolute top-[-8px] right-[-5px] z-10 text-red-400 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.length}
                              </span>
                            )}
                          </div>
                        </NavLink>

                        <Dropdown
                          label={
                            <Avatar alt="" img={users?.avatar} rounded={true} />
                          }
                          arrowIcon={false}
                          inline
                        >
                          <Dropdown.Header>
                            <span className="block text-sm">
                              {users?.email}
                            </span>
                          </Dropdown.Header>
                          <Dropdown.Item onClick={() => navigate("/profile")}>
                            Profile
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => navigate("/historyOrder")}
                          >
                            Đơn mua
                          </Dropdown.Item>

                          <Dropdown.Divider />
                          <Dropdown.Item onClick={handleLogout}>
                            Đăng xuất
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* bottom */}
          <div className="header-wapper-bottom">
            <div className="header-bottom">
              <div className="container">
                <ul className="navbar">
                  <li>
                    <NavLink to="/">
                      <i className="fa-solid fa-house" />
                      <span>TRANG CHỦ</span>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#lipstick">QUÀ TẶNG GIÁNG SINH</a>
                  </li>
                  <li>
                    <a href="#perfume">MISTERY BOX 3-5T</a>
                  </li>
                  <li>
                    <a href="#sunscreen">MISTERY BOX 5-7T</a>
                  </li>
                  <li>
                    <a href="#facemakeup">MISTERY BOX 7-10T</a>
                  </li>
                  <li>
                    <a href="#eyemakeup">ƯU ĐÃI 12 THÁNG</a>
                  </li>
                  <li>
                    <a href="#skincare">CÙNG MỞ HỘP NHÉ</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
function useSelector(arg0: (state: any) => any) {
  throw new Error("Function not implemented.");
}
