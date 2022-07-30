import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { instanceWithToken } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const useBoardQuery = (board_id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: getBoard, isSuccess: getBoardIsSuccess } = useQuery(
    ["board"],
    () =>
      axios.get(`https://tryaz.shop/api/goods/details/${board_id}`).catch(() => {
        alert("존재하지 않는 게시물입니다.");
        navigate("/");
      }),
    { refetchOnWindowFocus: false },
  );

  const { mutate: addBookmarkMutation } = useMutation(() => instanceWithToken.post(`/api/wish-list/${board_id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("board");
    },
  });

  const { mutate: deleteBookmarkMutation } = useMutation(() => instanceWithToken.delete(`/api/wish-list/${board_id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("board");
    },
  });

  return { getBoard, getBoardIsSuccess, addBookmarkMutation, deleteBookmarkMutation };
};
