import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../API/user";
import { message } from "antd";
import ButtonGoogle from "./button-google";
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:9000");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    passwordError: "",
    emailError: "",
  });

  useEffect(() => {
    socket.on("message", (newMessage) => {
      navigate("/");
    });
  }, []);

  const navigate = useNavigate();
  const handleLogin = async () => {
    let hasError = false;

    if (!email) {
      setError((prevState) => ({
        ...prevState,
        emailError: "Vui lòng nhập email",
      }));
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError((prevState) => ({
        ...prevState,
        emailError: "Email không hợp lệ",
      }));
      hasError = true;
    } else {
      setError((prevState) => ({
        ...prevState,
        emailError: "",
      }));
    }

    if (!password) {
      setError((prevState) => ({
        ...prevState,
        passwordError: "Vui lòng nhập mật khẩu",
      }));
      hasError = true;
    } else {
      setError((prevState) => ({
        ...prevState,
        passwordError: "",
      }));
    }

    if (hasError) {
      return;
    }

    const response = await login({ password, email });
    if (response?.response?.status === 400) {
      message.error("Tài khoản hoặc mật khẩu sai");
    } else if ((response as any)?.data?.dataGenerateToken?.status === 0) {
      message.error("Tài khoản đã bị khóa");
    } else {
      localStorage.setItem("accessToken", (response as any)?.data?.data);
      (response as any)?.data?.dataGenerateToken?.roleId === 1
        ? navigate("/")
        : navigate("/admin/product");
      window.location.reload();
      if ((response as any)?.data?.dataGenerateToken?.roleId) {
        message.success("Đăng nhập thành công");
      }
    }
  };
  return (
    <div className="bg-white relative lg:py-20">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl xl:px-5 lg:flex-row">
        <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
          <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
            <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
              <img
                src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                alt="Đăng nhập"
              />
            </div>
          </div>
          <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                Đăng nhập
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Tài khoản
                  </p>
                  <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {error.emailError && (
                    <p className="text-red-500">{error.emailError}</p>
                  )}
                </div>
                <div className="relative">
                  <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                    Mật khẩu
                  </p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                  />
                  {error.passwordError && (
                    <p className="text-red-500">{error.passwordError}</p>
                  )}
                </div>
                <div className="relative text-center">
                  <button
                    onClick={handleLogin}
                    className="w-[80%] h-13 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease cursor-pointer"
                  >
                    Đăng nhập
                  </button>
                  <ButtonGoogle />
                </div>
                <p className="text-center">
                  Nếu chưa có tài khoản,{" "}
                  <Link to="/register" className="text-blue-500">
                    Đăng ký
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
