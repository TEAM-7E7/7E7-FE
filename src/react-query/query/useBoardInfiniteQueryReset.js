import { useQueryClient } from "react-query";

export const useBoardInfiniteQueryReset = () => {
  const queryClient = useQueryClient();
  const resetQuery = () => {
    queryClient.resetQueries("page_board_list");
    queryClient.invalidateQueries("page_board_list");
  };

  return { resetQuery };
};
