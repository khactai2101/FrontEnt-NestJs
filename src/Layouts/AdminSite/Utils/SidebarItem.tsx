import {
  PiCubeBold,
  PiScrollBold,
  PiStackBold,
  PiStackOverflowLogoBold,
  PiShootingStarBold,
  PiSlideshowBold,
  PiSignatureBold,
  PiWalletBold,
  PiChatTeardropTextBold,
} from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";

export const SideBarItem = [
  {
    id: 1,
    path: "/",
    title: "DashBoard",
    icon: <LuLayoutDashboard />,
  },
  {
    id: 2,
    path: "/product",
    title: "Sản phẩm",
    icon: <PiCubeBold />,
  },
  { id: 3, path: "/user", title: "Người dùng", icon: <PiCubeBold /> },
  { id: 4, path: "/order", title: "Đơn hàng", icon: <PiScrollBold /> },
  { id: 5, path: "/category", title: "Danh mục", icon: <PiStackBold /> },
  {
    id: 6,
    path: "/size",
    title: "Size",
    icon: <PiStackOverflowLogoBold />,
  },
  {
    id: 7,
    path: "/brands",
    title: "Thương Hiệu",
    icon: <PiSignatureBold />,
  },
  {
    id: 8,
    path: "/voucher",
    title: "Voucher",
    icon: <PiShootingStarBold />,
  },
  { id: 9, path: "/blog", title: "Blogs", icon: <PiSlideshowBold /> },
  { id: 10, path: "/payment", title: "Payments", icon: <PiWalletBold /> },
  {
    id: 11,
    path: "/comment",
    title: "Bình luận",
    icon: <PiChatTeardropTextBold />,
  },
];
