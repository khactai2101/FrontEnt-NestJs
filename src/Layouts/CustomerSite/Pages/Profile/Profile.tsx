import { useEffect, useState } from "react";
import { getOneUser } from "../../../../API/user";
import { createAddress } from "../../../../API/address";
import { message } from "antd";

const Profile = () => {
  const [user, setUser] = useState<any>({});
  const [fileImage, setFileImage] = useState<any>([]);

  //   const [editableFields, setEditableFields] = useState({
  //     fullName: "",
  //   });

  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [fullName, setFullName] = useState<any>("");

  useEffect(() => {
    const data = async () => {
      const token: any = localStorage.getItem("accessToken");
      const oneUser = await getOneUser(token);
      setUser(oneUser);
      //   setEditableFields({
      //     fullName: oneUser.fullName || "",
      //   });
    };
    data();
  }, []);

  const handleAddAddress = async () => {
    const data = { address, phoneNumber };

    const res = await createAddress(data);
    if (res) {
      message.success("Đã thêm địa chỉ");
      setAddress("");
      setPhoneNumber("");
    }
  };

  return (
    <>
      <div className="h-[160px]"></div>
      <div className="bg-gray-200 min-h-screen pb-24">
        <div className="container mx-auto max-w-3xl mt-8">
          <div>
            <div className="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
              <div className="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
                <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">
                  Profile Info
                </h2>
                <p className="text-xs text-gray-500">
                  Update your basic profile information such as Email Address,
                  Name, and Image.
                </p>
              </div>
              <div className="md:w-2/3 w-full">
                <div className="py-8 px-16 clearfix">
                  <label
                    htmlFor="photo"
                    className="text-sm text-gray-600 w-full block"
                  >
                    Photo
                  </label>
                  <img
                    className="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left"
                    id="photo"
                    src={user.avatar}
                    alt="photo"
                  />
                  <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                    <input
                      type="file"
                      name="photo"
                      onChange={(e) => setFileImage(e.target.files)}
                      //   onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />{" "}
                    Change Photo
                  </div>
                </div>
                <div className="py-8 px-16">
                  <label htmlFor="name" className="text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
                    value={user.email}
                    name="name"
                    disabled
                  />
                  <label htmlFor="name" className="text-sm text-gray-600">
                    Full Name
                  </label>
                  <input
                    disabled
                    className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500 pb-2"
                    type="text"
                    value={user.fullName}
                    name="fullName"
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  <div className="h-2"></div>

                  <button
                    // onClick={handleUpdateProfile}
                    className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer"
                  >
                    Cập nhật Profile
                  </button>
                </div>

                <hr className="border-gray-200" />
                <div className="py-8 px-16">
                  <label htmlFor="email" className="text-sm text-gray-600">
                    Địa chỉ
                  </label>

                  <input
                    className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label htmlFor="email" className="text-sm text-gray-600">
                    Số điện thoại
                  </label>

                  <input
                    className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <div className="h-2"></div>
                  <input
                    type="submit"
                    onClick={handleAddAddress}
                    className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer "
                    value="Tạo địa chỉ"
                  />
                </div>
                <hr className="border-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
