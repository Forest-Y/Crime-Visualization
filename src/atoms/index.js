import { atom } from "recoil";

export const selectedCrimeState = atom({
  key: "selectedCrimeState",
  default: "刑法犯総数",
});

export const selectedPrefectureState = atom({
  key: "selectedPrefectureState",
  default: null,
});
