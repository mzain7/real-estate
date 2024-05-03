import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import CarouselPropertyItems from "../components/CarouselPropertyItems";

export default function Property() {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [message, setMessage] = useState(
    "I would like to inquire about your property. Please contact me at your earliest convenience."
  );
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const params = useParams();

  useEffect(() => {
    const listOfVisitedProperties =
      JSON.parse(localStorage.getItem("visitedProperties")) || [];
    if (!listOfVisitedProperties.includes(params.id)) {
      listOfVisitedProperties.push(params.id);
      localStorage.setItem(
        "visitedProperties",
        JSON.stringify(listOfVisitedProperties)
      );
    }

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/property/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProperty(data);
        setLoading(false);
        setError(false);
        return data.userRef;
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    const fetchOnwerDetails = async (onwerId) => {
      try {
        const res = await fetch(`/api/user/${onwerId}`);
        const data = await res.json();
        setOwnerDetails(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty().then((onwer) => {
      fetchOnwerDetails(onwer);
    });

    const fetchSimilarProperties = async () => {
      try {
        const res = await fetch("/api/property");
        const data = await res.json();
        setSimilarProperties(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSimilarProperties();
  }, [params.id]);

  return (
    <main className="max-w-7xl mx-auto">
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#568CB3"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {property && !loading && !error && (
        <div className="m-2">
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <p className="p-4 pb-0 text-2xl font-semibold">{property.name}</p>
          {/* <br /> */}
          <p className="p-4 pt-0 text-sm text-gray-600">{property.address}</p>

          <Carousel className="rounded-3xl overflow-hidden">
            {property.imageUrls.map((url) => (
              <Carousel.Item key={url}>
                <div
                  className=" h-[300px] md:h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="flex flex-col mt-4 justify-between md:flex-row mb-6">
            <div className="flex flex-col md:w-2/3 p-3 my-7 gap-4">
              <div className="flex justify-between items-center">
                <p className="text-2xl font-semibold inline-block">
                  {property.name}
                </p>
                <p className="inline-block min-w-fit text-2xl font-semibold text-slate-700">
                  ${" "}
                  {property.offer
                    ? property.discountPrice.toLocaleString("en-US")
                    : property.regularPrice.toLocaleString("en-US")}
                  {property.type === "rent" && " / month"}
                </p>
              </div>
              <p className="flex items-center gap-2 text-slate-600  text-sm">
                <FaMapMarkerAlt className="text-green-700 text-lg" />
                {property.address}
              </p>
              <hr />
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description: </span>
                <br />
                {property.description}
              </p>
              <hr />
              <span className="font-semibold text-black">Amenities: </span>
              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
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
                  <FaParking className="text-lg" />
                  {property.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {property.furnished ? "Furnished" : "Unfurnished"}
                </li>
              </ul>
              <hr />
            </div>
            <div className="w-full md:w-2/6 bg-gray-200 rounded-lg p-3 flex flex-col gap-1 justify-evenly">
              <p className="mx-auto text-2xl font-bold">Contact Onwer</p>
              <p>
                <span className="font-semibold"> Email: </span>
                {ownerDetails?.email}
              </p>
              <p>
                <span className="font-semibold"> Phone: </span>
                {ownerDetails?.phone}
              </p>
              <label htmlFor="message" className="text-sm font-semibold">
                {" "}
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                rows="3"
                value={message}
                onChange={onChange}
                placeholder="Enter your message here..."
                className="w-full border p-3 rounded-lg pt-2"
              ></textarea>
              <div className="flex md:flex-col gap-2 mt-2">
                <Link
                  to={`mailto:${ownerDetails?.email}?subject=Regarding ${ownerDetails?.name}&body=${message}`}
                  className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 w-1/2 md:w-full"
                >
                  Send Email
                </Link>

                <Link
                  to={`whatsapp://send?text=${message}&phone=+923174317202`}
                  className="bg-green-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 w-1/2 md:w-full"
                >
                  Whatsapp
                </Link>
              </div>
            </div>
          </div>
          <hr />
          <div className="mt-8 sm:px-14">
            <CarouselPropertyItems
              properties={similarProperties}
              title={`Similar Houses around ${property.address}`}
              linkText="Show more places for rent"
              linkTo="/search?type=all"
            />
          </div>
        </div>
      )}
    </main>
  );
}
