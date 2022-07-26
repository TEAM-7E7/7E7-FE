import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

// token-recoil-persist
const { persistAtom: tokenPersist } = recoilPersist({
  key: "X-REFRESH-TOKEN",
});
export const refresh_token = atom({
  key: "X-REFRESH-TOKEN",
  default: "",
  effects_UNSTABLE: [tokenPersist],
});

export const useRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useRecoilState(refresh_token);
  return { refreshToken, setRefreshToken };
};

// category-recoil-persist
const { persistAtom: boardConfigPersist } = recoilPersist({ key: "BOARD_CONFIG" });
export const board_config = atom({
  key: "BOARD_CONFIG",
  default: {
    CATEGORY: [],
    ORDERBY: "ORDER_BY_CREATED_AT",
  },
  effects_UNSTABLE: [boardConfigPersist],
});

export const useBoardConfig = () => {
  const [boardConfig, setBoardConfig] = useRecoilState(board_config);
  return {
    categoryList: boardConfig.CATEGORY,
    setCategoryList: (categoryList) => setBoardConfig({ CATEGORY: categoryList, ORDERBY: boardConfig.ORDERBY }),
    orderBy: boardConfig.ORDERBY,
    setOrderBy: (orderBy) => setBoardConfig({ CATEGORY: boardConfig.CATEGORY, ORDERBY: orderBy }),
  };
};
