import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Layout/Header";
import CustomerFooter from "../../Components/Layout/Footer";
import Footer from "../../Components/Layout/Footer";
import { IProduct } from "../../../../Types/type";

const CustomerLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default CustomerLayout;
