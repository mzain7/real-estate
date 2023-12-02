import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { MdDelete } from "react-icons/md";

const amenitiesOptions = [
  { value: "parking", label: "Parking" },
  { value: "furnished", label: "Furnished" },
];
const responsive = {
  all: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

export default function CreateProperty() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (files.length < 1) return;
    const newImageUrls = [];
    for (let i = 0; i < files.length; i++) {
      newImageUrls.push(URL.createObjectURL(files[i]));
    }
    setImageUrls(newImageUrls);
  }, [files]);

  const handleImageSubmit = async () => {
    if (files.length > 0 && files.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      try {
        const urls = await Promise.all(promises);
        setImageUploadError(false);
        setUploading(false);
        return urls;
      } catch (err) {
        setImageUploadError("Image upload failed (2 mb max per image)");
        setUploading(false);
      }
    } else {
      setImageUploadError("You can only upload 6 images per property");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ProfilePictures");
      data.append("cloud_name", "dhk5vhnp4");
      fetch("https://api.cloudinary.com/v1_1/dhk5vhnp4/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => resolve(data.secure_url))
        .catch((err) => reject(err));
    });
  };

  const handleRemoveImage = (index) => {
    console.log(index);
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    if (e.target.id === "type") {
      setFormData({ ...formData, type: e.target.value });
    }

    if (e.target.id === "offer") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (files.length < 1)
        return setError("You must upload at least one image");
      if (files.length > 6)
        return setError("You can only upload 6 images per property");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const imgUrls = await handleImageSubmit();
      const res = await fetch("/api/property/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrls: imgUrls,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      console.log(data);
      navigate(`/property/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  const handleAmenitiesChange = (e) => {
    console.log(e);
    amenitiesOptions.forEach((element) => {
      console.log(element.value);
      console.log(e.find(({ value }) => value == element.value) ? true : false);
      setFormData({
        ...formData,
        [element.value]: e.find(({ value }) => value == element.value)
          ? true
          : false,
      });
    });
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Property
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="font-semibold">Type:</label>
              <select
                onChange={handleChange}
                defaultValue={"rent"}
                id="type"
                className="border rounded-lg p-3"
              >
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
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
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <label htmlFor="offer" className="self-center">
                Offer
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>

                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4 sm:w-1/2">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <label
              htmlFor="images"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              <input
                onChange={(e) => setFiles([...files, ...e.target.files])}
                type="file"
                className="hidden"
                id="images"
                accept="image/*"
                multiple
              />
              {uploading ? "Uploading..." : "Add Images"}
            </label>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {imageUrls.length > 0 && files.length > 0 && (
            <div className="w-full">
              <Carousel responsive={responsive} showDots containerClass="pb-3">
                {imageUrls.map((url, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={url}
                      alt=""
                      className="h-[230px] w-full rounded-3xl overflow-hidden object-cover"
                    />
                    <MdDelete
                      onClick={() => handleRemoveImage(index)}
                      className=" text-2xl absolute cursor-pointer right-1 bottom-1 bg-red-600 text-white rounded-full p-1"
                      size={40}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
          <button
            disabled={loading || uploading}
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 hover:shadow-lg disabled:opacity-80"
          >
            {loading ? "Creating..." : "Create Property"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
