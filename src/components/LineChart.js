import React from "react";
import ReactTooltip from "react-tooltip";
import { useRecoilValue } from "recoil";
import { selectedCrimeState, selectedPrefectureState } from "../atoms";

const LineChart = ({ crimeData }) => {
  //console.log(crimeData);
  const selectedCrime = useRecoilValue(selectedCrimeState);
  const selectedPrefecture = useRecoilValue(selectedPrefectureState);
  //console.log(selectedCrime, selectedPrefecture);
  if (
    crimeData === null ||
    selectedCrime === null ||
    selectedPrefecture === null
  ) {
    return <p>loading...</p>;
  }
  const berHeight = 10;
  const width = 700;
  const height = 565;
  //console.log(crimeData)
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

  return (
    <div className="container">
      <ReactTooltip delayHide={1000} effect="solid" />
      <svg viewBox = {`0 0 ${width} ${height}`}>
        <g transform="scale(0.7)">
          <g transform="translate(60, -30)">
            <g>
              {" "}
              {/*軸の描画*/}
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={height}
                stroke="#888"
                strokeWidth="2"
              />
            </g>
            <g>
              <line
                x1="0"
                y1={height - 15}
                x2={width - 200}
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
                    {crimeData[selectedPrefecture][selectedCrime][
                      "normalizedValue"
                    ][year].map((item, j) => {
                      preData =
                        crimeData[selectedPrefecture][selectedCrime][
                          "normalizedValue"
                        ][year][Math.max(0, j - 1)];

                      //console.log(preData)
                      return (
                        <g key={j}>
                          <g>
                            <line
                              x1={Math.max(0, 40 * (j - 1))}
                              y1={height - preData * (height - 65) - 15}
                              x2={40 * j}
                              y2={height - item * (height - 65) - 15}
                              //stroke={"black"}
                              stroke={colors[year]}
                              strokeWidth="2"
                            />
                          </g>
                          <g transform={`translate(${40 * j}, 0)`}>
                            <ellipse
                              cx={0}
                              cy={height - item * (height - 65) - 15}
                              rx="5"
                              ry="5"
                              fill={colors[year]}
                              //fill = "black"
                              data-tip={
                                "罪名：" +
                                selectedCrime +
                                "\n正規化前の認知件数：" +
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
                              transform="translate(581, 580) rotate(90)"
                            >
                              {yLavel[j].padStart(2, "0") + "月"}
                            </text>
                          </g>
                          <g
                            key={5000 * i}
                            transform={`translate(0, ${
                              -50 * (i * 12 + j + 1)
                            })`}
                          >
                            <line
                              x1="0"
                              y1={height - 15}
                              x2={width - 200}
                              y2={height - 15}
                              stroke="#888"
                            />
                            <text
                              x="-5"
                              y={height - 15}
                              textAnchor="end"
                              dominantBaseline="central"
                            >
                              {(0.1 * (j + 1)).toFixed(2)}
                            </text>
                          </g>
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

export default LineChart;
