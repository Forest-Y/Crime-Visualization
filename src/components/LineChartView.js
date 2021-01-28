import React from "react";
import ReactTooltip from "react-tooltip";
import { useRecoilValue } from "recoil";
import {
  crimeDataState,
  selectedCrimeState,
  selectedPrefectureState,
} from "../atoms";
import { Responsive } from "./Responsive";

const LineChart = ({ width, height }) => {
  const crimeData = useRecoilValue(crimeDataState);
  const selectedCrime = useRecoilValue(selectedCrimeState);
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  if (
    crimeData === null ||
    selectedCrime === null ||
    selectedPrefecture === null
  ) {
    return <p>loading...</p>;
  }
  const berHeight = 10;
  const keys = [selectedCrime];
  const yLavel = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const colors = {
    2018: "red",
    2019: "blue",
    2020: "green",
  };
  const max = Math.max(
    Math.max(...crimeData[selectedPrefecture][selectedCrime]["value"]["2018"]),
    Math.max(...crimeData[selectedPrefecture][selectedCrime]["value"]["2019"]),
    Math.max(...crimeData[selectedPrefecture][selectedCrime]["value"]["2020"])
  );
  const maxDigit = String(max).length;
  const maxLength =
    Math.ceil(max / 10 ** Math.max(1, maxDigit - 1)) *
    10 ** Math.max(1, maxDigit - 1);

  return (
    <div className="container">
      <ReactTooltip delayHide={1000} effect="solid" />
      <h1>{selectedPrefecture + " " + selectedCrime}</h1>
      <svg
        // viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
      >
        <g transform="scale(0.7)">
          <g transform="translate(50, -150)">
            <g>
              {/*<text transform="translate(0, 180)" font-size="2em">
                {selectedCrime}
              </text>*/}
              <text transform="translate(600, 300)">2018年</text>
              <ellipse cx={592} cy={295} rx="5" ry="5" fill="red" />
              <text transform="translate(600, 330)">2019年</text>
              <ellipse cx={592} cy={325} rx="5" ry="5" fill="blue" />
              <text transform="translate(600, 360)">2020年</text>
              <ellipse cx={592} cy={355} rx="5" ry="5" fill="green" />{" "}
              {/*軸の描画*/}
              <line
                x1="0"
                y1="200"
                x2="0"
                y2={height - 14}
                stroke="#888"
                strokeWidth="2"
              />
            </g>
            <g>
              <line
                x1="0"
                y1={height - 15}
                x2={width}
                y2={height - 15}
                stroke="#888"
                strokeWidth="2"
              />
            </g>
            <g>
              {/* グラフの描画 */}
              {crimeData["years"].map((year, i) => {
                let preData;
                return (
                  <g key={year}>
                    {crimeData[selectedPrefecture][selectedCrime]["value"][
                      year
                    ].map((item, j) => {
                      preData =
                        crimeData[selectedPrefecture][selectedCrime]["value"][
                          year
                        ][Math.max(0, j - 1)];

                      return (
                        <g key={j}>
                          <g>
                            <line
                              x1={Math.max(0, 40 * (j - 1))}
                              y1={height - (preData / maxLength) * 500 - 15}
                              x2={40 * j}
                              y2={height - (item / maxLength) * 500 - 15}
                              //stroke={"black"}
                              stroke={colors[year]}
                              strokeWidth="2"
                            />
                          </g>
                          <g transform={`translate(${40 * j}, 0)`}>
                            <ellipse
                              cx={0}
                              cy={height - 15 - (item / maxLength) * 500}
                              rx="5"
                              ry="5"
                              fill={colors[year]}
                              //fill = "black"
                              data-tip={
                                "認知件数：" +
                                crimeData[selectedPrefecture][selectedCrime][
                                  "value"
                                ][year][j]
                              }
                            />
                            <text
                              x="15"
                              y={height + 15}
                              textAnchor="end"
                              dominantBaseline="central"
                              transform="translate(0, -13)"
                            >
                              {yLavel[j] + "月"}
                            </text>
                          </g>
                          {j <= 9 && i === 0 && (
                            <g
                              key={5000 * i}
                              transform={`translate(0, ${
                                -50 * (i * 12 + j + 1)
                              })`}
                            >
                              <line
                                x1="0"
                                y1={height - 15}
                                x2={width }
                                y2={height - 15}
                                stroke="#888"
                              />
                              <text
                                x="-5"
                                y={height - 15}
                                textAnchor="end"
                                dominantBaseline="central"
                              >
                                {(maxLength / 10) * (j + 1)}
                              </text>
                            </g>
                          )}
                          <text
                            x="-5"
                            y={height - 15}
                            textAnchor="end"
                            dominantBaseline="central"
                          >
                            {0}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export function LineChartView() {
  return (
    <Responsive
      render={(width, height) => <LineChart width={width} height={height} />}
    ></Responsive>
  );
}
