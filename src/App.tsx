import { Route, Routes } from "react-router-dom";
import Login from "./Layouts/Auth/Login";
import Register from "./Layouts/Auth/Register";
import Dashboard from "./Layouts/AdminSite/Pages/dasboard/Dashboard";
import NotFound from "./Layouts/NotFound/NotFound";
import AdminLayout from "./Layouts/AdminSite/Pages/AdminLayout/AdminLayout";
import CustomerLayout from "./Layouts/CustomerSite/Pages/CustomerLayout/CustomerLayout";
import Home from "./Layouts/CustomerSite/Pages/Home/Home";
import Cart from "./Layouts/CustomerSite/Pages/Cart/Cart";
import Product from "./Layouts/CustomerSite/Pages/Product/Product";
import ManagerOrder from "./Layouts/AdminSite/Pages/manager-order/ManagerOrder";
import ManagerUser from "./Layouts/AdminSite/Pages/manager-user/ManagerUser";
import ManagerCategory from "./Layouts/AdminSite/Pages/Manager-category/ManagerCategory";
import ManagerBrands from "./Layouts/AdminSite/Pages/Manager-brand/ManagerBrands";
import ManagerVouchers from "./Layouts/AdminSite/Pages/Manager-voucher/ManagerVouchers";
import ManagerBlogs from "./Layouts/AdminSite/Pages/Manger-Blog/ManagerBlogs";
import ManagerPayments from "./Layouts/AdminSite/Pages/MangerPayment/ManagerPayments";
import ManagerComments from "./Layouts/AdminSite/Pages/Comment/ManagerComments";
import Checkout from "./Layouts/CustomerSite/Pages/Checkout/Checkout";
import MangerSize from "./Layouts/AdminSite/Pages/Manger-Size/MangerSize";
import HistoryOrder from "./Layouts/CustomerSite/Pages/HistoryOrder/HistoryOrder";
import VerifyLogin from "./Layouts/Auth/verify/Verify";
import Profile from "./Layouts/CustomerSite/Pages/Profile/Profile";
import ManagerProducts from "./Layouts/AdminSite/Pages/manager-product/ManagerProduct";

function App(): JSX.Element {
  return (
    <Routes>
      {/**Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/verifyGoogle/:token/v1" element={<VerifyLogin />} />
      <Route path="/register" element={<Register />} />
      {/** Customer*/}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
        <Route path="product/:id" element={<Product />}></Route>
        <Route path="historyOrder" element={<HistoryOrder />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
      {/**Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />}></Route>
        <Route path="product" element={<ManagerProducts />}></Route>
        <Route path="order" element={<ManagerOrder />}></Route>
        <Route path="user" element={<ManagerUser />}></Route>
        <Route path="category" element={<ManagerCategory />}></Route>
        <Route path="size" element={<MangerSize />}></Route>
        <Route path="brands" element={<ManagerBrands />}></Route>
        <Route path="voucher" element={<ManagerVouchers />}></Route>
        <Route path="blog" element={<ManagerBlogs />}></Route>
        <Route path="payment" element={<ManagerPayments />}></Route>
        <Route path="comment" element={<ManagerComments />}></Route>
      </Route>
      {/**Page Not Found*/}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default App;
