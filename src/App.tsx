import { Route, Routes, useSearchParams, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddBoard from "./pages/AddBoard";
import "./App.scss";
import { useEffect } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import { useRefreshToken } from "./recoil/store";
import { Cookies } from "react-cookie";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get("X-ACCESS-TOKEN")?.split(" ")[1];
  const refreshToken = searchParams.get("X-REFRESH-TOKEN")?.split(" ")[1];
  const cookies = new Cookies();
  const { setRefreshToken } = useRefreshToken();
  useEffect(() => {
    if (refreshToken && accessToken) {
      setRefreshToken(refreshToken);
      cookies.set("X-ACCESS-TOKEN", accessToken);
      alert("로그인에 성공했습니다.");
      navigate("/");
    }
  }, []);
  return (
    <>
      <Header />
      <div className="contents">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/add-board" element={<PrivateRoute path="/add-board" component={AddBoard} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
