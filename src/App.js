import "bulma/css/bulma.min.css";
import Menu from "./components/Menu";
import { ChoroplethMapPage } from "./components/Choropleth"
import LineChart from "./components/LineChart" 

export default function App() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifth">
            <Menu />
          </div>
          <div className="column">
            <div className="row box"><ChoroplethMapPage /></div>
            <div className="row box"><LineChart /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
