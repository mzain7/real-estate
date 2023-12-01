import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("https://gorgeous-pear-fly.cyclic.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create an Account
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="email">Username: </label>
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
            min={4}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
            min={4}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Password: </label>
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
            min={8}
          />
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex justify-center"
        >
          {loading ? (
            <ThreeDots
              height="25"
              width="30"
              radius="9"
              color="#ffffff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      {error && <p className="text-red-500 mt-1">{error}</p>}
      <div className="flex gap-2 mt-1">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}