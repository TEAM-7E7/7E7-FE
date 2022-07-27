import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { instanceWithToken } from "../../api/api";

export const useBoardQuery = (board_id) => {
  const queryClient = useQueryClient();

  const { data: getBoard, isSuccess: getBoardIsSuccess } = useQuery(
    ["board"],
    () => axios.get(`https://tryaz.shop/api/goods/details/${board_id}`),
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
