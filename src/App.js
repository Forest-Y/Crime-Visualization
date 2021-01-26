import "bulma/css/bulma.min.css";
import Menu from "./components/Menu";

export default function App() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifth">
            <Menu />
          </div>
          <div className="column">
            <div className="row">map</div>
            <div className="row">graph</div>
          </div>
        </div>
      </div>
    </section>
  );
}
