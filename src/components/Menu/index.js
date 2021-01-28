import { useRecoilState } from "recoil";
import { selectedCrimeState } from "../../atoms";

export default function Menu({ typeOfCrime }) {
  const [selected, setSelected] = useRecoilState(selectedCrimeState);

  return (
    <div className="container">
      <div className="box">
        <div className="menu">
          {typeOfCrime.map((crimeName) => (
            <div className="control" key={crimeName}>
              <label className="radio">
                <input
                  type="radio"
                  value={crimeName}
                  checked={selected === crimeName ? "checked" : ""}
                  name="radio"
                  onChange={(e) => setSelected(e.target.value)}
                />
                {crimeName}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
