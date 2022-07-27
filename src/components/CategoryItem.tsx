import "../styles/components/header.scss";
import { useBoardConfig } from "../recoil/store";
import { useNavigate } from "react-router-dom";
import { useBoardInfiniteQueryReset } from "../react-query/query/useBoardInfiniteQueryReset";

interface CategoryItemOptions {
  name: string;
  value: string;
}

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
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
