import "../styles/components/header.scss";
import { Link, useNavigate } from "react-router-dom";
import { UploadIcon, HamburgerIcon, AlarmIcon, PersonIcon, ChatIcon, ConfigIcon } from "../assets/icons/FigmaIcons";
import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { useRefreshToken } from "../recoil/store";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { refreshToken } = useRefreshToken();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const logout = () => {
    localStorage.removeItem("X-REFRESH-TOKEN");
    cookies.remove("X-ACCESS-TOKEN");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="header-title">
          <div onClick={handleOpen} className="header-icon">
            <HamburgerIcon />
          </div>
          <Link to="/">
            <span>MarketClip</span>
          </Link>
        </div>

        <div className="header-menu">
          {!jwtUtils.isValid(refreshToken) ? (
            <>
              <Link to="/sign-in">로그인</Link>
              <Link to="/sign-up">회원가입</Link>
            </>
          ) : (
            <>
              <Link to="#" onClick={logout}>
                로그아웃
              </Link>
            </>
          )}

          <Link to="/add-board">
            <div className="header-icon">
              <UploadIcon />
            </div>
          </Link>
        </div>
      </div>

      <div className={["slide-menu", isOpen ? "slide-in" : "slide-away"].join(" ")}>
        <div onClick={handleClose} className="backdrop-overlay" />

        <div className="slide-menu-area">
          <div className="wrapper">
            <Link to="/">
              <span>MarketClip</span>
            </Link>
          </div>
          <div className="icons-wrapper">
            <AlarmIcon color="#FFE247" />
            <div
              onClick={() => {
                navigate("/my-page");
              }}
            >
              <PersonIcon color="#22FF6D" />
            </div>
            <ChatIcon color="#FF965A" />
            <ConfigIcon color="#80C9FF" />
          </div>

          <div className="categories-wrapper">
            {[
              { id: 0, name: "카", starred: true },
              { id: 1, name: "테", starred: true },
              { id: 2, name: "고", starred: false },
              { id: 3, name: "리", starred: false },
            ].map((category) => (
              <CategoryItem key={category.id} id={category.id} name={category.name} starred={category.starred} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
