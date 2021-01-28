import { atom } from "recoil";

export const selectedCrimeState = atom({
  key: "selectedCrimeState",
  default: "刑法犯総数",
});

export const selectedPrefectureState = atom({
  key: "selectedPrefectureState",
  default: null,
});

export const crimeDataState = atom({
  key: "crimeDataState",
  default: null,
});

export const dateState = atom({
  key: "dateState",
  default: ["2018/01", "2018/02"],
});
