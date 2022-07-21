import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { instanceWithToken } from "../../api/api";

export const useBoardQuery = (board_id) => {
  const queryClient = useQueryClient();

  const { data: getBoard, isSuccess: getBoardIsSuccess } = useQuery(["board"], () =>
    axios.get(`https://trayz.shop/api/goods/${board_id}`),
  );

  const { mutate: bookmarkBoardMutation } = useMutation(() => instanceWithToken(`/api/wish-list/${board_id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("board");
    },
  });

  return { getBoard, getBoardIsSuccess, bookmarkBoardMutation };
};
