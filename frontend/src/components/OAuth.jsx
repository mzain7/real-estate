import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseMessage = async (data) => {
    data = jwt_decode(data.credential);
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        photo: data.picture,
      }),
    });

    data = await res.json();
    dispatch(signInSuccess(data));
    navigate("/");
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId="1057361351467-c2evffad6a75r2hora03jsjaf4lb23h2.apps.googleusercontent.com">
      <GoogleLogin
        width="100%"
        onSuccess={responseMessage}
        onError={errorMessage}
      />
    </GoogleOAuthProvider>
  );
}
