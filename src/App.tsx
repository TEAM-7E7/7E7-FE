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
import Board from "./pages/Board";

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const accessToken = searchParams.get("X-ACCESS-TOKEN")?.split(" ")[1];
  const refreshToken = searchParams.get("X-REFRESH-TOKEN")?.split(" ")[1];
  const cookies = new Cookies();
  const { setRefreshToken } = useRefreshToken();
  useEffect(() => {
    // 소셜로그인시, 쿼리 파라미터로 token을 넘겨주므로 저장 후, url을 안보이게 함
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
          <Route path="/board/:id" element={<Board />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
