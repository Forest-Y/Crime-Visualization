import "bulma/css/bulma.min.css";
import "./style.css";
import { Menu } from "./components/Menu";
import { ChoroplethMapView } from "./components/ChoroplethMapView";
import { LineChartView } from "./components/LineChartView";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  crimeDataState,
  dateState,
  selectedCrimeState,
  selectedPrefectureState,
} from "./atoms";

export default function App() {
  const [crimeData, setCrimeData] = useRecoilState(crimeDataState);
  const [selected, setSelected] = useRecoilState(selectedCrimeState);
  const [date, setDate] = useRecoilState(dateState);
  const setSelectedPrefecture = useSetRecoilState(selectedPrefectureState);

  const crimeDataUrl = `${process.env.PUBLIC_URL}/data/crimeData.json`;

  const dates = [
    "2018/01",
    "2018/02",
    "2018/03",
    "2018/04",
    "2018/05",
    "2018/06",
    "2018/07",
    "2018/08",
    "2018/09",
    "2018/10",
    "2018/11",
    "2018/12",
    "2019/01",
    "2019/02",
    "2019/03",
    "2019/04",
    "2019/05",
    "2019/06",
    "2019/07",
    "2019/08",
    "2019/09",
    "2019/10",
    "2019/11",
    "2019/12",
    "2020/01",
    "2020/02",
    "2020/03",
    "2020/04",
    "2020/05",
    "2020/06",
    "2020/07",
    "2020/08",
    "2020/09",
    "2020/10",
    "2020/11",
  ];

  useEffect(() => {
    async function loadCrimeData(dataUrl) {
      const res = await fetch(dataUrl);
      const data = await res.json();

      setCrimeData(data);
    }

    loadCrimeData(crimeDataUrl);
  }, []);

  return (
    <>
      <nav
        className="navbar is-info"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href=".">
            <h1>Visualization of Japan Crimes</h1>
          </a>
        </div>
      </nav>
      <main className="main has-background-info-light">
        <div className="main-contents">
          <div
            className="p-3"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "20%",
            }}
          >
            <div className="box is-paddinglress is-radiusless">
              <Menu />
            </div>
          </div>
          <div
            className="p-3"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              height: "100%",
              left: "20%",
              width: "40%",
            }}
          >
            <div className="box">
              <div
                className="p-3"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  height: "100px",
                }}
              >
                <div
                  className="is-paddinglress is-radiusless"
                  style={{ width: "100%", height: "100%", padding: "20px" }}
                >
                  <div className="columns">
                    <div className="column">
                      {crimeData !== null && selected !== null && (
                        <div className="field is-horizontal">
                          {/* <div className="field-label is-normal">
                            <label className="label">A</label>
                          </div> */}
                          <div className="field-body">
                            <div className="field is-narrow">
                              <div className="control">
                                <div className="select is-fullwidth">
                                  <select
                                    onChange={(e) =>
                                      setDate((prev) => [
                                        e.target.value,
                                        prev[1],
                                      ])
                                    }
                                  >
                                    {dates.map((d) => (
                                      <option
                                        key={d}
                                        value={d}
                                        selected={d === date[0]}
                                      >
                                        {d}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="column">
                      {crimeData !== null && selected !== null && (
                        <div className="field is-horizontal">
                          {/* <div className="field-label is-normal">
                            <label className="label">B</label>
                          </div> */}
                          <div className="field-body">
                            <div className="field is-narrow">
                              <div className="control">
                                <div className="select is-fullwidth">
                                  <select
                                    onChange={(e) =>
                                      setDate((prev) => [
                                        prev[0],
                                        e.target.value,
                                      ])
                                    }
                                  >
                                    {dates.map((d) => (
                                      <option
                                        key={d}
                                        value={d}
                                        selected={d === date[1]}
                                      >
                                        {d}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="column">
                      <button
                        className="button is-info"
                        onClick={() => setSelectedPrefecture("全国")}
                      >
                        全国のデータ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "100px",
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <div
                  className="is-paddinglress is-radiusless"
                  style={{ width: "100%", height: "100%", padding: "20px" }}
                >
                  <ChoroplethMapView />
                </div>
              </div>
            </div>
          </div>
          <div
            className="p-3"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "40%",
            }}
          >
            <div className="box is-paddinglress is-radiusless">
              <LineChartView />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
