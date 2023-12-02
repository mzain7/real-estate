import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import CarouselPropertyItems from "../components/CarouselPropertyItems";

export default function Home() {
  const [offerProperties, setOfferProperties] = useState([]);
  const [saleProperties, setSaleProperties] = useState([]);
  const [rentProperties, setRentProperties] = useState([]);
  const [visitedProperties, setVisitedProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOfferProperties = async () => {
      try {
        const res = await fetch("/api/property/get?offer=true&limit=10");
        const data = await res.json();
        setOfferProperties(data);
        fetchRentProperties();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentProperties = async () => {
      try {
        const res = await fetch("/api/property/get?type=rent&limit=10");
        const data = await res.json();
        setRentProperties(data);
        fetchSaleProperties();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleProperties = async () => {
      try {
        const res = await fetch("/api/property/get?type=sale&limit=10");
        const data = await res.json();
        setSaleProperties(data);
        fetchVisitedProperties();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchVisitedProperties = async () => {
      const listOfVisitedProperties = JSON.parse(
        localStorage.getItem("visitedProperties")
      );
      if (!listOfVisitedProperties) return;
      try {
        const res = await fetch(
          `/api/property/get-visited?ids=${listOfVisitedProperties.join(",")}`
        );
        const data = await res.json();
        console.log(data);
        setVisitedProperties(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferProperties();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div>
      {/* top */}
      <div className='flex flex-col justify-center items-center gap-6 py-5 px-10 md:p-28 mx-auto bg-[url("/img/hero.jpg")] h-[40vh] md:h-[60vh] bg-cover bg-no-repeat bg-left-bottom mb-2'>
        <h1 className="text-slate-300 font-semibold text-3xl md:text-6xl">
          <span className="text-2xl text-golden">
            Explore Local Real Estate
          </span>
          <br />
          Find a <span className="text-slate-200">Home</span> to Suit <br />{" "}
          Your Lifestyle
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 pl-3 pr-1 py-1 rounded-3xl flex items-center justify-between w-full md:w-1/2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full h-10 pl-5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="rounded-full bg-black hover:opacity-70">
            <FaSearch className="text-white text-[40px] font-light p-2" />
          </button>
        </form>
      </div>
      <hr />
      <div className="max-w-6xl mx-auto p-3 pt-0 flex flex-col gap-8 mb-10">
        <CarouselPropertyItems
          properties={offerProperties}
          title={"Recent offers"}
          linkText={"Show more offers"}
          linkTo={"/search?offer=true"}
        />
        <CarouselPropertyItems
          properties={rentProperties}
          title={"Recent places for rent"}
          linkText={"Show more places for rent"}
          linkTo={"/search?type=rent"}
        />
        <CarouselPropertyItems
          properties={saleProperties}
          title={"Recent places for sale"}
          linkText={"Show more places for sale"}
          linkTo={"/search?type=sale"}
        />
        <CarouselPropertyItems
          properties={visitedProperties}
          title={"Recently Viewed"}
        />
      </div>
    </div>
  );
}
