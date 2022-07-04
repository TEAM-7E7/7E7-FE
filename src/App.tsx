import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import SignUp from "./pages/sign-up/SignUp";
import SignIn from "./pages/sign-in/SignIn";
import AddBoard from "./pages/add-board/AddBoard";
import WebCam from "./components/webCam/WebCam";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/add-board" element={<AddBoard />} />
        <Route path="/WebCam" element={<WebCam />} />
      </Routes>
    </>
  );
};

export default App;
