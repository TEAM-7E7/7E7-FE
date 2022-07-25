import "../styles/components/header.scss";
import { Link, useNavigate } from "react-router-dom";
import { UploadIcon, HamburgerIcon, AlarmIcon, PersonIcon, ChatIcon, ConfigIcon } from "../assets/icons/FigmaIcons";
import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { useRefreshToken } from "../recoil/store";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";
import { BoardCategory } from "../dto/BoardCategoryAndState";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { refreshToken, setRefreshToken } = useRefreshToken();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const logout = () => {
    setRefreshToken("");
    cookies.remove("X-ACCESS-TOKEN");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };
  console.log(Object.keys(BoardCategory));
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
            {Object.keys(BoardCategory).map((category: string, index: number) => (
              <CategoryItem key={index} name={BoardCategory[category]} value={category} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
