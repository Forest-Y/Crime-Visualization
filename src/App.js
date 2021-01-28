import "bulma/css/bulma.min.css";
import Menu from "./components/Menu";
import ChoroplethMap from "./components/ChoroplethMap";
import LineChart from "./components/LineChart";
import { useEffect, useState } from "react";

export default function App() {
  const [crimeData, setCrimeData] = useState(null);

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
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifth">
            <Menu
              typeOfCrime={crimeData === null ? [] : crimeData.typeOfCrime}
            />
          </div>
          <div className="column">
            <div className="box">
              <ChoroplethMap crimeData={crimeData} />
            </div>
          </div>
        </div>
        <div className="box">
          <LineChart crimeData = {crimeData}/>
        </div>
      </div>
    </section>
  );
}
