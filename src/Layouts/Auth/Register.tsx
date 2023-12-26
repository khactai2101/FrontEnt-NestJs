import React, { useEffect, useState } from "react";
import Footer from "../CustomerSite/Components/Layout/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllUsers } from "../../API/user";
import { IUser } from "../../Types/type";
import { notification } from "antd";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<IUser[]>([]);
  const initialFormData: FormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName) {
      newErrors.fullName = "Vui lòng nhập họ và tên.";
    }
    if (formData.fullName.length > 25) {
      newErrors.fullName = "Họ tên không được vượt quá 25 ký tự";
    }
    if (!formData.email) {
      newErrors.email = "Vui lòng nhập email.";
    }
    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);

    try {
      // Gửi yêu cầu đăng ký lên API
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response);

      if (response.data.success) {
        notification.success({
          message: "Đăng ký thành công",
          placement: "topRight",
        });
        setFormData(initialFormData);
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 1000);
      } else {
        notification.warning({
          message: "Email đã tồn tại",
          placement: "topRight",
        });
      }
    } catch (error) {
      setSuccessMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <>
      <div className="bg-white relative lg:py-20">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb- ml-auto max-w-7xl xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img
                  src="https://res.cloudinary.com/dllxhogzr/image/upload/v1702286393/Project-NestJs/tdhatl0e3uqqpcnvkd2p.png"
                  alt="Logo"
                />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                  Đăng ký
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="w-[400px] mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                        Họ và tên
                      </p>
                      <input
                        // placeholder="Họ và tên"
                        type="text"
                        className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-3 pr-4 pb-3 pl-4 mt-1 text-base block bg-white border-gray-300 rounded-md ${
                          errors.fullName ? "border-red-500" : ""
                        }`}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && (
                        <p className="text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                        Email
                      </p>
                      <input
                        // placeholder="Email"
                        type="text"
                        className={`border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-3 pr-4 pb-3 pl-4 mt-2 text-base block bg-white border-gray-300 rounded-md ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-a ml-a font-medium text-gray-600 absolute">
                        Mật khẩu
                      </p>
                      <input
                        type="password"
                        className={`border placeholder-gray-a focus:outline-a focus:border-a w-full pt-3 pr-4 pb-3 pl-a mt-a text-base block bg-white border-gray-a rounded-md ${
                          errors.password ? "text-red-500" : ""
                        }`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                      )}
                    </div>
                    <div className="relative">
                      <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-a ml-a font-medium text-gray-600 absolute">
                        Nhập lại mật khẩu
                      </p>
                      <input
                        type="password"
                        className={`border placeholder-gray-a focus:outline-a focus:border-a w-full pt-3 pr-4 pb-3 pl-a mt-a text-base block bg-white border-gray-a rounded-md ${
                          errors.confirmPassword ? "text-red-500" : ""
                        }`}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                    <div className="relative text-center">
                      <button
                        type="submit"
                        className="w-[80%] h-15 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease cursor-pointer"
                      >
                        Đăng ký
                      </button>
                    </div>
                    {successMessage && (
                      <p className="text-center text-green-a">
                        {successMessage}
                      </p>
                    )}
                    <p className="text-center">
                      Nếu đã có tài khoản,{" "}
                      <Link to="/Login" className="text-blue-a">
                        Đăng nhập
                      </Link>{" "}
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
