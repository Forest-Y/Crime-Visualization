import "bulma/css/bulma.min.css";
import "./style.css";
import { Menu } from "./components/Menu";
import { ChoroplethMapView } from "./components/ChoroplethMapView";
import { LineChartView } from "./components/LineChartView";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { crimeDataState } from "./atoms";

export default function App() {
  const setCrimeData = useSetRecoilState(crimeDataState);

  const crimeDataUrl = `${process.env.PUBLIC_URL}/data/crimeData.json`;

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
              right: 0,
              left: 0,
              width: "100%",
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
              top: "100px",
              bottom: 0,
              left: 0,
              width: "45%",
            }}
          >
            <div className="box is-paddinglress is-radiusless">
              <ChoroplethMapView />
            </div>
          </div>
          <div
            className="p-3"
            style={{
              position: "absolute",
              top: "100px",
              right: 0,
              bottom: 0,
              width: "55%",
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
