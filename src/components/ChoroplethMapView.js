import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  crimeDataState,
  dateState,
  selectedCrimeState,
  selectedPrefectureState,
} from "../atoms";
import { Responsive } from "./Responsive";
import ReactTooltip from "react-tooltip";

function ChoroplethMap({ width, height }) {
  const [features, setFeatures] = useState([]);
  const [selectedPrefecture, setSelectedPrefecture] = useRecoilState(
    selectedPrefectureState
  );
  const selectedCrime = useRecoilValue(selectedCrimeState);
  const crimeData = useRecoilValue(crimeDataState);
  const date = useRecoilValue(dateState);

  const mapDataUrl = `${process.env.PUBLIC_URL}/data/japan.json`;

  const projection = d3.geoMercator().scale(3500).center([139.69167, 35.68944]);
  const path = d3.geoPath().projection(projection);

  useEffect(() => {
    async function loadMapData(dataUrl) {
      const res = await fetch(dataUrl);
      const data = await res.json();

      const { features } = topojson.feature(data, data.objects.japan);

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
      d3.extent(
        crimeData.prefectures.map((prefecture) => {
          const a =
            crimeData[prefecture][selectedCrime]["value"][
              date[0].split("/")[0]
            ][+date[0].split("/")[1] - 1];

          const b =
            crimeData[prefecture][selectedCrime]["value"][
              date[1].split("/")[0]
            ][+date[1].split("/")[1] - 1];
          if (a === 0) {
            return -100;
          }
          return Math.floor(((b - a) / a) * 100);
        })
      )
    )
    .range(["#00f", "#f00"]);

  function moveToEndAtIndex(arr, index) {
    return [
      ...arr.slice(0, index),
      ...arr.slice(index + 1),
      ...arr.slice(index, index + 1),
    ];
  }

  return (
    <svg
      // viewBox={`0 0 ${width} ${height}`}
      width={Math.min(width, height)}
      height={Math.min(width, height)}
    >
      <g transform={`scale(${0.6})`}>
        <g transform="translate(250,250)">
          {features.map((feature, i) => {
            return (
              <g
                key={feature.properties.id}
                transform={`${
                  feature.properties.nam_ja === "北海道"
                    ? "translate(-700, 300)"
                    : ""
                }${
                  feature.properties.nam_ja === "沖縄県"
                    ? "translate(500, -300)"
                    : ""
                }`}
              >
                {feature.properties.nam_ja === "北海道" && (
                  <g transform="translate(400, -150)">
                    <line x1="60" y1="0" x2="300" y2="0" stroke="gray" />
                    <line x1="300" y1="0" x2="650" y2="-300" stroke="gray" />
                  </g>
                )}

                {feature.properties.nam_ja === "沖縄県" && (
                  <g transform="translate(-550, 840)">
                    <line x1="0" y1="150" x2="100" y2="-50" stroke="gray" />
                    <line x1="100" y1="-50" x2="450" y2="-50" stroke="gray" />
                    <line x1="450" y1="-50" x2="550" y2="150" stroke="gray" />
                    {/* <line x1="0" y1="150" x2="0" y2="250" stroke="gray" />
                    <line x1="550" y1="150" x2="550" y2="250" stroke="gray" /> */}
                  </g>
                )}

                <path
                  d={path(feature)}
                  fill={color(
                    Math.floor(
                      crimeData[feature.properties.nam_ja][selectedCrime][
                        "value"
                      ][date[0].split("/")[0]][+date[0].split("/")[1] - 1] === 0
                        ? -100
                        : ((crimeData[feature.properties.nam_ja][selectedCrime][
                            "value"
                          ][date[1].split("/")[0]][+date[1].split("/")[1] - 1] -
                            crimeData[feature.properties.nam_ja][selectedCrime][
                              "value"
                            ][date[0].split("/")[0]][
                              +date[0].split("/")[1] - 1
                            ]) /
                            crimeData[feature.properties.nam_ja][selectedCrime][
                              "value"
                            ][date[0].split("/")[0]][
                              +date[0].split("/")[1] - 1
                            ]) *
                            100
                    )
                  )}
                  data-tip={`${feature.properties.nam_ja}の増減率${Math.floor(
                    crimeData[feature.properties.nam_ja][selectedCrime][
                      "value"
                    ][date[0].split("/")[0]][+date[0].split("/")[1] - 1] === 0
                      ? -100
                      : ((crimeData[feature.properties.nam_ja][selectedCrime][
                          "value"
                        ][date[1].split("/")[0]][+date[1].split("/")[1] - 1] -
                          crimeData[feature.properties.nam_ja][selectedCrime][
                            "value"
                          ][date[0].split("/")[0]][
                            +date[0].split("/")[1] - 1
                          ]) /
                          crimeData[feature.properties.nam_ja][selectedCrime][
                            "value"
                          ][date[0].split("/")[0]][
                            +date[0].split("/")[1] - 1
                          ]) *
                          100
                  )}%`}
                  stroke={`${
                    selectedPrefecture === feature.properties.nam_ja
                      ? "lime"
                      : "white"
                  }`}
                  strokeWidth={`${
                    selectedPrefecture === feature.properties.nam_ja ? "2" : "1"
                  }`}
                  onClick={() => {
                    setSelectedPrefecture(feature.properties.nam_ja);
                    setFeatures((prev) => moveToEndAtIndex(prev, i));
                  }}
                />
              </g>
            );
          })}
        </g>
      </g>
    </svg>
  );
}

export function ChoroplethMapView() {
  return (
    <Responsive
      render={(width, height) => (
        <ChoroplethMap
          width={Math.min(width, height)}
          height={Math.min(width, height)}
        />
        // <ChoroplethMap width={500} height={500} />
      )}
    >
      <ReactTooltip delayHide={1000} effect="solid" />
    </Responsive>
  );
}
