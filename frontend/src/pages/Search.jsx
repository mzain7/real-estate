import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyItem from "../components/PropertyItem";
import { ThreeDots } from "react-loader-spinner";
import ReactSelect from "react-select";

const amenitiesOptions = [
  { value: "parking", label: "Parking" },
  { value: "furnished", label: "Furnished" },
  { value: "offer", label: "Offer" },
];

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchProperties = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `api/property?${searchQuery}`,
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (data.length >= 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, [location.search]);

  const handleAmenitiesChange = (e) => {
    console.log(e);
    amenitiesOptions.forEach((element) => {
      console.log(element.value);
      console.log(e.find(({ value }) => value == element.value) ? true : false);
      setSidebardata({
        ...sidebardata,
        [element.value]: e.find(({ value }) => value == element.value)
          ? true
          : false,
      });
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "type") {
      setSidebardata({ ...sidebardata, type: e.target.value });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfProperties = properties.length;
    const startIndex = numberOfProperties;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/property?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setProperties([...properties, ...data]);
  };
  return (
    <div className="flex flex-col">
      <div className="p-7 border-b-2 shadow-lg">
        <form onSubmit={handleSubmit} className="flex gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Type:</label>
            <select
              onChange={handleChange}
              defaultValue={sidebardata.type}
              id="type"
              className="border rounded-lg p-3"
            >
              <option value="all">Rent & Sale</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <ReactSelect
              id="amenities"
              className="max-w-[400px] min-w-[200px]"
              options={amenitiesOptions}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              onChange={handleAmenitiesChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={`${sidebardata.sort}_${sidebardata.order}`}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 w-[200px] mx-auto text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-1">
          Search results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && properties.length === 0 && (
            <p className="text-xl text-slate-700">No property found!</p>
          )}
          {loading && (
            <div className="flex justify-center items-center w-full">
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

          {!loading &&
            properties &&
            properties.map((property) => (
              <PropertyItem key={property._id} property={property} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
