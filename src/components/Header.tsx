import "../styles/components/header.scss";
import { Link } from "react-router-dom";

const Header = () => {
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
      </div>
    </div>
  );
};

export default Header;
