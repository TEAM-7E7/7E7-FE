import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

// recoil-persist
const { persistAtom } = recoilPersist({
  key: "X-REFRESH-TOKEN",
});
export const refresh_token = atom({
  key: "X-REFRESH-TOKEN",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const useRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useRecoilState(refresh_token);
  return { refreshToken, setRefreshToken };
};
