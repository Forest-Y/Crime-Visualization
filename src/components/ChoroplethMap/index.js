import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { useRecoilState } from "recoil";
import { selectedPrefectureState } from "../../atoms";

export default function ChoroplethMap({ crimeData }) {
  const [features, setFeatures] = useState([]);
  const [selectedPrefecture, setSelectedPrefecture] = useRecoilState(
    selectedPrefectureState
  );

  const mapDataUrl = `${process.env.PUBLIC_URL}/data/japan.json`;

  const width = 1000;
  const height = 500 * 2;
  const projection = d3.geoMercator().scale(3000).center([139.69167, 35.68944]);
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

  console.log(selectedPrefecture);

  function PrefectureWrap({ children, feature }) {
    return (
      <g
        transform={`${feature.properties.nam_ja === "北海道" ? "translate(-600, 300)" : ""
          }${feature.properties.nam_ja === "沖縄県" ? "translate(900, -400)" : ""
          }`}
      >
        {children}
      </g>
    );
  }

  function moveToEndAtIndex(arr, index) {
    return [
      ...arr.slice(0, index),
      ...arr.slice(index + 1),
      ...arr.slice(index, index + 1),
    ];
  }

  if (features === null || crimeData === null) {
    return <p>loading</p>;
  }

  console.log(features);

  return (
    <div className="container mx">
      <svg width={width} height={height}>
        <g transform="translate(200,300)">
          {features.map((feature, i) => {
              return (
              <PrefectureWrap feature={feature}>
                <path
                  d={path(feature)}
                  fill={color(feature.properties.value)}
                  stroke={`${selectedPrefecture === feature.properties.nam_ja
                    ? "black"
                    : "white"
                    }`}
                  onClick={() => {
                    setSelectedPrefecture(feature.properties.nam_ja);
                    setFeatures((prev) => moveToEndAtIndex(prev, i));
                  }}
                />
              </PrefectureWrap>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
