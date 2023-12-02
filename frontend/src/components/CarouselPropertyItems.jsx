import PropertyItem from "../components/PropertyItem";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 30,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1100 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1100, min: 768 },
    items: 2,
    partialVisibilityGutter: window.innerWidth / 5 - 100,
  },
  mobile1: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
    partialVisibilityGutter: window.innerWidth / 2 - 100,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
};
export default function CarouselPropertyItems({
  properties,
  title,
  linkText,
  linkTo,
}) {
  return (
    <>
      {properties && properties.length > 0 && (
        <div className="">
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-600">{title}</h2>
            {linkText && linkTo && (
              <Link
                className="text-sm text-blue-800 hover:underline pl-1"
                to={linkTo}
              >
                {linkText}
              </Link>
            )}
          </div>
          <hr />
          <Carousel
            responsive={responsive}
            showDots
            containerClass="pb-8 pt-2 overflow-hidden"
            draggable
            keyBoardControl
            swipeable
            arrows
            partialVisible
            itemClass=""
          >
            {properties.map((property) => (
              <PropertyItem property={property} key={property._id} />
            ))}
          </Carousel>
          <hr />
        </div>
      )}
    </>
  );
}
