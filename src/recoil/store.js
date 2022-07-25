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
const { persistAtom: categoryPersist } = recoilPersist({ key: "CATEGORY" });
export const category_list = atom({
  key: "CATEGORY",
  default: [],
  effects_UNSTABLE: [categoryPersist],
});

export const useCategory = () => {
  const [categoryList, setCategoryList] = useRecoilState(category_list);
  return { categoryList, setCategoryList };
};
