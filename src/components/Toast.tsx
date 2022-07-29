import "../styles/components/toast.scss";
import { useBoardConfig } from "../recoil/store";
import { useNavigate } from "react-router-dom";
import { useBoardInfiniteQueryReset } from "../react-query/query/useBoardInfiniteQueryReset";

interface ToastOptions {
  name: string;
  value: string;
}

const Toast = ({ name, value }: ToastOptions) => {
  const { orderBy, setOrderBy } = useBoardConfig();
  const navigate = useNavigate();

  return (
    <div
      className="toast-wrapper"
      onClick={() => {
        setOrderBy(value);
        navigate("/");
      }}
    >
      <p>{name}</p>
    </div>
  );
};

export default Toast;
