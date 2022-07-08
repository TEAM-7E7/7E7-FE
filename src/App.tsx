import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddBoard from "./pages/AddBoard";
import "./App.scss";
import MyPage from "./pages/MyPage";
const App = () => {
  return (
    <>
      <Header />
      <div className="contents">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/add-board" element={<AddBoard />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
