import Talk from "../images/Talk.png";
import like from "../images/like.png";
import User from "../images/User.png";
import "../styles/Nav.scss";
const Nav = () => {
  return (
    <div className="Nav">
      <button>
        <img className="Talk" src={Talk} />
      </button>
      <button>
        <img className="like" src={like} />
      </button>
      <button>
        <img className="User" src={User} />
      </button>
    </div>
  );
};

export default Nav;
