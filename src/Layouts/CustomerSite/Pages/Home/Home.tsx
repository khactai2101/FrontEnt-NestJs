import Card from "../../Components/Card/Card";
import DefaultCarousel from "../../Components/Carousel/Carousel";
import Blog from "../Blog/Blog";

const Home = () => {
  return (
    <div>
      <div className="h-[160px]"></div>
      <div className="w-full h-[600px]">
        <DefaultCarousel />
      </div>
      <div>
        <Card />
      </div>
      <div>
        {" "}
        <Blog />
      </div>
    </div>
  );
};

export default Home;
