import "../styles/components/header.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useBoardInfiniteQuery } from "../react-query/query/useBoardInfinteQuery";

const Header = () => {
  const { getBoard, getNextPage, getBoardIsSuccess, getNextPageIsPossible } = useBoardInfiniteQuery();
  const navigate = useNavigate();

  const onMypage = async (item: any) => {
    navigate("/Sale", { state: { getboard: item } });
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
