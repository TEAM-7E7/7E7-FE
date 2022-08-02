import "../styles/components/header.scss";
import { useBoardConfig } from "../recoil/store";
import { useNavigate } from "react-router-dom";

interface OrderByItemOptions {
  name: string;
  value: string;
}

const OrderByItem = ({ name, value }: OrderByItemOptions) => {
  const { orderBy, setOrderBy } = useBoardConfig();
  const navigate = useNavigate();

  return (
    <div
      className={["category", orderBy === value && "selected"].join(" ")}
      onClick={() => {
        setOrderBy(value);
        navigate("/");
      }}
    >
      <p>{name}</p>
    </div>
  );
};

export default OrderByItem;
