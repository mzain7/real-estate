import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";

export default function PropertyItem({ property }) {
  return (
    <div className="pr-2">
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg mr-3 w-full sm:w-[330px] my-2 max-w-[350px] min-w-[280px]">
        <Link to={`/property/${property._id}`}>
          <img
            src={
              property.imageUrls[0] ||
              "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
            }
            alt="property cover"
            className="h-[230px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />
          <div className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700">
              {property.name}
            </p>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm text-gray-600 truncate w-full">
                {property.address}
              </p>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {property.description}
            </p>
            <p className="text-slate-500 mt-2 font-semibold ">
              $
              {property.offer
                ? property.discountPrice.toLocaleString("en-US")
                : property.regularPrice.toLocaleString("en-US")}
              {property.type === "rent" && " / month"}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {property.bedrooms > 1
                  ? `${property.bedrooms} beds `
                  : `${property.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {property.bathrooms > 1
                  ? `${property.bathrooms} baths `
                  : `${property.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {property.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
}
