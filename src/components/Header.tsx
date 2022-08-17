import "../styles/components/header.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  UploadIcon,
  HamburgerIcon,
  AlarmIcon,
  PersonIcon,
  ChatIcon,
  LoginIcon,
  LogoutIcon,
} from "../assets/icons/FigmaIcons";
import { useState } from "react";
import CategoryItem from "./CategoryItem";
import { useBoardConfig, useRefreshToken } from "../recoil/store";
import { jwtUtils } from "../utils/jwtUtils";
import { Cookies } from "react-cookie";
import { BoardCategory, BoardOrderBy } from "../dto/BoardCategoryAndState";

import axios from "axios";

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenSearchbar, setOpenSearchbar] = useState<boolean>(false);
  const { refreshToken, setRefreshToken } = useRefreshToken();
  const { orderBy, setOrderBy } = useBoardConfig();

  const navigate = useNavigate();
  const cookies = new Cookies();
  const logout = () => {
    setRefreshToken("");
    cookies.remove("X-ACCESS-TOKEN");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenSearchbar = () => setOpenSearchbar(true);
  const handleCloseSearchbar = () => setOpenSearchbar(false);

  return (
    <>
      <div className="header-wrapper">
        <div className="header-base">
          <div className="header-title">
            <div onClick={handleOpen} className="header-icon">
              <HamburgerIcon />
            </div>
            <Link
              to="#"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <div className="header-title-icon">
                <img src="/favicon.svg" />
              </div>
              <span>MarketClip</span>
            </Link>
          </div>

          <div className="header-menu">
            {!jwtUtils.isValid(refreshToken) ? (
              <>
                <Link to="/sign-in">
                  <div className="header-icon-transparent icon-auth icon-hover">
                    <LoginIcon />
                    <div className="hover-text">로그인</div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="#" onClick={logout}>
                  <div className="header-icon-transparent icon-auth icon-hover">
                    <LogoutIcon />
                    <div className="hover-text">로그아웃</div>
                  </div>
                </Link>
              </>
            )}

            {/*<div
              onClick={isOpenSearchbar ? handleCloseSearchbar : handleOpenSearchbar}
              className="header-icon-transparent"
            >
              <SearchIcon />
            </div>*/}

            <Link to="/add-board">
              <div className="header-icon-transparent icon-hover">
                <UploadIcon />
                <div className="hover-text">업로드</div>
              </div>
            </Link>
          </div>
        </div>
        {/* 검색 기능 */}
        {/*<div className={["header-searchbar", isOpenSearchbar ? "slide-down" : "slide-hide"].join(" ")}>
          <select style={{ marginRight: "1rem" }}>
            <option value={"search"}>검색</option>
          </select>
          <Input id="search" size="medium" name="email" fullWidth placeholder="검색어를 입력해주세요." />
        </div>*/}
      </div>

      <div className={["slide-menu", isOpen ? "slide-in" : "slide-away"].join(" ")}>
        <div onClick={handleClose} className="backdrop-overlay" />

        <div className="slide-menu-area">
          <div
            className="wrapper"
            onClick={() => {
              handleClose();
            }}
          >
            <Link
              to="#"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <div className="header-title-icon">
                <img src="/favicon.svg" />
              </div>
              <span>MarketClip</span>
            </Link>
          </div>
          <div className="icons-wrapper">
            <div
              onClick={() => {
                alert("현재 개발중입니다. 잠시만 기다려주세요 =)");
              }}
            >
              <AlarmIcon color="#FFE247" />
            </div>

            <div
              onClick={async () => {
                await axios
                  .get("https://tryaz.shop/api/user/refresh-re", {
                    headers: {
                      "X-REFRESH-TOKEN": "BEARER " + refreshToken,
                    },
                  })
                  .then((result) => {
                    const newRefreshToken = result.headers["x-refresh-token"].split(" ")[1];
                    const newAccessToken = result.headers["x-access-token"].split(" ")[1];
                    setRefreshToken(newRefreshToken);
                    const daysToExpire = new Date(2147483647 * 1000);
                    cookies.set("X-ACCESS-TOKEN", newAccessToken, { expires: daysToExpire });
                    navigate("/my-page");
                    handleClose();
                  })
                  .catch(() => {
                    navigate("/my-page");
                    handleClose();
                  });
              }}
            >
              <PersonIcon color="#22FF6D" />
            </div>
            <div
              onClick={() => {
                navigate("/chatting");
                handleClose();
              }}
            >
              <ChatIcon color="#FF965A" />
            </div>
          </div>

          <div className="categories-wrapper">
            <select
              className="category-order-by"
              onChange={(e) => {
                setOrderBy(e.target.value);
                navigate("/");
              }}
              defaultValue={orderBy || "ORDER_BY_CREATED_AT"}
            >
              {Object.keys(BoardOrderBy).map((orderByKey: string, index: number) => (
                <option key={index} value={orderByKey}>
                  {BoardOrderBy[orderByKey]}
                </option>
              ))}
            </select>
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
