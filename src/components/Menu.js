import { useRecoilState, useRecoilValue } from "recoil";
import { crimeDataState, selectedCrimeState } from "../atoms";

export function Menu() {
  const [selected, setSelected] = useRecoilState(selectedCrimeState);
  const crimeData = useRecoilValue(crimeDataState);

  if (crimeData === null) {
    return <p>loading...</p>;
  }
  return (
    <div className="menu">
      {/* <div className="select">
        <select onChange={(e) => setSelected(e.target.value)}>
          {crimeData.typeOfCrime.map((crimeName) => (
            <option
              key={crimeName}
              value={crimeName}
              selected={crimeName === selected}
            >
              {crimeName}
            </option>
          ))}
        </select>
      </div> */}
      <div className="select is-multiple">
        <select
          multiple
          size={crimeData.typeOfCrime.length}
          onChange={(e) => setSelected(e.target.value)}
        >
          {crimeData.typeOfCrime.map((crimeName) => (
            <option
              key={crimeName}
              value={crimeName}
              selected={crimeName === selected}
            >
              {crimeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
