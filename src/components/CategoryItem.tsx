import "../styles/components/header.scss";
import { useBoardConfig } from "../recoil/store";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "../assets/icons/FigmaIcons";
import { CategoryItemOptions } from "../dto/HomeDto";

const CategoryItem = ({ name, value }: CategoryItemOptions) => {
  const { categoryList, setCategoryList } = useBoardConfig();
  const navigate = useNavigate();

  return (
    <div>
      {categoryList.includes(value) ? (
        <div
          className="category selected"
          onClick={() => {
            setCategoryList([...categoryList].filter((category) => category !== value));
            navigate("/");
          }}
        >
          <p>{name}</p>
          <div>
            <StarIcon />
          </div>
        </div>
      ) : (
        <div
          className="category"
          onClick={() => {
            setCategoryList([...categoryList, value]);
            navigate("/");
          }}
        >
          <p>{name}</p>
          <div>
            <StarIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
