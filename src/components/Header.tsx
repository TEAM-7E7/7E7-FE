import "../styles/components/header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRefreshToken } from "../recoil/store";
import axios from "axios";
import { instanceWithToken } from "../api/api";

const Header = () => {
  const onMypage = async () => {
    await instanceWithToken.post("https://tryaz.shop/api/goods/my-page?page=1&size=5");
  };
  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">
          <span>MarketClip</span>
        </Link>
      </div>
      <div className="header-menu">
        <Link to="/sign-in">로그인</Link>
        <Link to="/sign-up">회원가입</Link>
        <Link to="/add-board">업로드</Link>
        <Link to="/Mypage" onClick={onMypage}>
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default Header;
