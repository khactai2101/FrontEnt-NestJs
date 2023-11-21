import { Carousel } from "flowbite-react";
import imageSrc from "./400060327_299743186306030_7648823136211569815_n.png";
export default function DefaultCarousel() {
  return (
    <Carousel>
      <img alt="..." src={imageSrc} />
      <img
        alt="..."
        src="https://kyo.vn/wp-content/uploads/2018/04/sonxinh-banner-1.jpg"
      />
    </Carousel>
  );
}
