import React, { useState, useEffect } from "react";

const LineChartSetUp = () => {
    const [crimeData, setCrimeData] = useState(null)
    useEffect(() => {
        (async () => {
            const res = await fetch(`${process.env.PUBLIC_URL}/data/crimeData.json`)
            const data = await res.json()
            setCrimeData(data)
        })()
    }, [])
    if (crimeData == null) {
        return <p>loading</p>;
    }
    return <LineChart crimeData={crimeData} />;
}
const LineChart = ({ crimeData }) => {
    const key1 = "全国"
    const key2 = "刑法犯総数"
    console.log(crimeData[key1][key2]["normalizedValue"])
    const berHeight = 10;
    const width = 2500
    const height = 565
    let perData = crimeData[key1][key2]["normalizedValue"]["2018"][0]
    const yLavel = {
        "2018":["H30/1", "H30/2", "H30/3", "H30/4", "H30/5", "H30/6", "H30/7", "H30/8", "H30/9", "H30/10", "H30/11", "H30/12"],
        "2019":["H31/1", "H31/2", "H31/3", "H31/4", "R1/5", "R1/6", "R1/7", "R1/8", "R1/9", "R1/10", "R1/11", "R1/12"],
        "2020":["R2/1", "R2/2", "R2/3", "R2/4", "R2/5", "R2/6", "R2/7", "R2/8", "R2/9", "R2/10", "R2/11", "R2/12"]
    }

    return (
        <div>
            <section className="section">
                <svg width={width} height={height}>
                    <g transform="scale(0.7)">
                        <g transform="translate(60, -30)">
                            <g> {/*軸の描画*/}
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
                            <g> {/* グラフの描画 */}
                                {crimeData["years"].map((year, i) => {
                                    let preData
                                    return (
                                        crimeData[key1][key2]["normalizedValue"][year].map((item, j) => {
                                            if (year !== "2018" && j === 0) {
                                                preData = crimeData[key1][key2]["normalizedValue"][String(parseFloat(year) - 1)][11]
                                            } else {
                                                preData = crimeData[key1][key2]["normalizedValue"][year][Math.max(0, j - 1)]
                                            }
                                            return (
                                                <g>
                                                    <g>
                                                        <line
                                                            x1={Math.max(0, 60 * (i * 12 + j - 1))}
                                                            y1={height - preData * (height - 65) - 15}
                                                            x2={60 * (i * 12 + j)}
                                                            y2={height - item * (height - 65) - 15}
                                                            stroke="#888"

                                                        />
                                                    </g>
                                                    <g
                                                        key={item}
                                                        transform={`translate(${60 * (i * 12 + j)}, 0)`}
                                                    >
                                                        <ellipse
                                                            cx={0}
                                                            cy={height - item * (height - 65) - 15}
                                                            rx="3"
                                                            ry="3"
                                                            fill="black"
                                                            onMouseEnter = {(() => {console.log("OK")})}
                                                        />
                                                        <text
                                                            x="15"
                                                            y={height + 15}
                                                            textAnchor="end"
                                                            dominantBaseline="central"
                                                        >
                                                            {yLavel[year][j]}
                                                        </text>
                                                    </g>
                                                    <g
                                                        key={5000 * i}
                                                        transform={`translate(0, ${-50 * (i * 12 + j + 1)})`}
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
                                            )
                                        })
                                    )
                                })}
                            </g>
                        </g>
                    </g>
                </svg>
            </section>
        </div>
    )
}

export default LineChartSetUp