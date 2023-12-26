import { Carousel } from "flowbite-react";
import imageSrc from "./400060327_299743186306030_7648823136211569815_n.png";
import imageSrc1 from "./bìa-01.png";

export default function DefaultCarousel() {
  return (
    <Carousel>
      <img alt="..." src={imageSrc1} />
      <img alt="..." src={imageSrc1} />
    </Carousel>
  );
}
