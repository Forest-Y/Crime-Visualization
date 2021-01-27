import { atom } from "recoil";

export const selectedCrimeState = atom({
  key: "selectedCrimeState",
  default: null,
});

export const selectedPrefectureState = atom({
  key: "selectedPrefectureState",
  default: null,
});
