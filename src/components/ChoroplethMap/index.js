import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";

export default function ChoroplethMap({ crimeData }) {
  const [features, setFeatures] = useState([]);

  const mapDataUrl = `${process.env.PUBLIC_URL}/data/japan.json`;

  const width = 960;
  const height = 500;
  const projection = d3.geoMercator().scale(1000).center([139.69167, 35.68944]);
  const path = d3.geoPath().projection(projection);
  const color = d3
    .scaleLinear()
    .domain(d3.extent(features, (feature) => feature.properties.value))
    .range(["#ccc", "#f00"]);

  useEffect(() => {
    async function loadMapData(dataUrl) {
      const res = await fetch(dataUrl);
      const data = await res.json();

      const { features } = topojson.feature(data, data.objects.japan);

      setFeatures(features);
    }

    loadMapData(mapDataUrl);
  }, []);

  if (features === null || crimeData === null) {
    return <p>loading</p>;
  }

  return (
    <svg width={width} height={height}>
      <g>
        {features.map((feature, i) => {
          // const prefecture = crimeData.prefectures[feature.properties.id - 1];

          return (
            <path
              key={feature.properties.id}
              d={path(feature)}
              fill={color(feature.properties.value)}
              stroke="white"
            />
          );
        })}
      </g>
    </svg>
  );
}
