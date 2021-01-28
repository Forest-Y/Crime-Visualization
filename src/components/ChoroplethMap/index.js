import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedCrimeState, selectedPrefectureState } from "../../atoms";

export default function ChoroplethMap({ crimeData }) {
  const [features, setFeatures] = useState([]);
  const [selectedPrefecture, setSelectedPrefecture] = useRecoilState(
    selectedPrefectureState
  );
  const selectedCrime = useRecoilValue(selectedCrimeState);

  const mapDataUrl = `${process.env.PUBLIC_URL}/data/japan.json`;

  const width = 1000;
  const height = 1000;
  const projection = d3.geoMercator().scale(3500).center([139.69167, 35.68944]);
  const path = d3.geoPath().projection(projection);

  useEffect(() => {
    async function loadMapData(dataUrl) {
      const res = await fetch(dataUrl);
      const data = await res.json();

      const { features } = topojson.feature(data, data.objects.japan);

      console.log(features);
      setFeatures(features);
    }

    loadMapData(mapDataUrl);
  }, []);

  // prevent erorr caused by crimeData of null
  if (features === null || crimeData === null || selectedCrime === null) {
    return <p>loading</p>;
  }

  const color = d3
    .scaleLinear()
    .domain(
      // d3.extent(features, (feature) =>
      //   crimeData[feature.properties.nam_ja][selectedCrime]["normalizedValue"][
      //     "2018"
      //   ].reduce((acc, cur) => acc + cur, 0)
      // )
      d3.extent(crimeData.prefectures, (prefecture) =>
        crimeData[prefecture][selectedCrime]["normalizedValue"]["2018"].reduce(
          (acc, cur) => acc + cur,
          0
        )
      )
    )
    .range(["#ccc", "#f00"]);

  function PrefectureWrap({ children, feature }) {
    return (
      <g
        transform={`${
          feature.properties.nam_ja === "北海道" ? "translate(-700, 300)" : ""
        }${
          feature.properties.nam_ja === "沖縄県" ? "translate(500, -300)" : ""
        }`}
      >
        {feature.properties.nam_ja === "北海道" ? (
          <g transform="translate(400, -150)">
            <line x1="60" y1="0" x2="300" y2="0" stroke="gray" />
            <line x1="300" y1="0" x2="650" y2="-300" stroke="gray" />
          </g>
        ) : null}

        {feature.properties.nam_ja === "沖縄県" ? (
          <g transform="translate(-550, 840)">
            <line x1="0" y1="150" x2="100" y2="-50" stroke="gray" />
            <line x1="100" y1="-50" x2="450" y2="-50" stroke="gray" />
            <line x1="450" y1="-50" x2="550" y2="150" stroke="gray" />
          </g>
        ) : null}
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

  return (
    <div className="container">
      <div>
        <svg
          width={width}
          height={height}
          style={{
            maxHeight: `${height}px`,
            display: "block",
            margin: "0 auto",
          }}
        >
          <g transform="translate(300,300)">
            {features.map((feature, i) => {
              return (
                <PrefectureWrap feature={feature} key={feature.properties.id}>
                  <path
                    d={path(feature)}
                    fill={color(
                      crimeData[feature.properties.nam_ja][selectedCrime][
                        "normalizedValue"
                      ]["2018"].reduce((acc, cur) => acc + cur, 0)
                    )}
                    stroke={`${
                      selectedPrefecture === feature.properties.nam_ja
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
    </div>
  );
}
