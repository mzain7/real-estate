import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProperty from "./pages/CreateProperty";
import UpdateProperty from "./pages/UpdateProperty";
import Property from "./pages/Property";
import Search from "./pages/Search";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/search" element={<Search />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-property" element={<CreateProperty />} />
          <Route
            path="/update-property/:propertyId"
            element={<UpdateProperty />}
          />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
