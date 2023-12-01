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
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
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
            containerClass="pb-8 pt-2"
            draggable
            keyBoardControl
            swipeable
            slidesToSlide={2}
            arrows
            partialVisible
            itemClass="mx-2"
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
