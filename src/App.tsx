import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AddBoard from "./pages/AddBoard";
import "./App.scss";
import { useEffect } from "react";
import axios from "axios";
import { instanceWithToken } from "./api/api";
import { Cookies } from "react-cookie";

const App = () => {
  /* useEffect(() => {
    const a = async () => {
      await axios
        .post(
          "https://tryaz.shop/api/refresh-re",
          {},
          {
            headers: {
              "X-REFRESH-TOKEN":
                "BEARER " +
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJFWFBJUkVEX0RBVEUiOjE2NTc3Mjg1MzQsImlzcyI6InNwYXJ0YSIsIlVTRVJfSUQiOjJ9.4tkZ-H2r23UjH0Ogxv4Gu42rRMz_Ao2Rp0cSWGc9D2E",
            },
          },
        )
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));
    };
    a();
  }, []);*/
  return (
    <>
      <Header />
      <div className="contents">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/add-board" element={<AddBoard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
