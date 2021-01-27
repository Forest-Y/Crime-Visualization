import React, { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";

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
    //const key2 = "刑法犯総数"
    //console.log(crimeData)
    const berHeight = 10;
    const width = 1600
    const height = 565
    //console.log(crimeData)
    const keys = crimeData.typeOfCrime
    const yLavel = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
    const colors = {
        "刑法犯総数":"lavender",
        "窃盗犯総数":"slateblue",
        "重要犯罪総数":"firebrick",
        "殺人":"orchid",
        "強盗殺人":"lawngreen",
        "放火":"peru",
        "強制性交等":"orange",
        "略奪誘拐・人身売買":"mediumaquamarine",
        "重要窃盗犯総数":"olive",
        "侵入盗":"royalblue",
        "侵入盗(住宅対象)":"deeppink",
        "侵入等(その他)":"khaki",
        "自動車盗":"orangered",
        "ひったくり":"indigo",
        "すり":"darkgreen",
        "強盗":"teal",
        "強制わいせつ":"black"
    }
    return (
        <div>
            <ReactTooltip delayHide={1000} effect='solid' />
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
                                {keys.map((crime, i) => {
                                    return (
                                        <g key={crime}>
                                            {crimeData["years"].map((year, j) => {
                                                let preData
                                                return (
                                                    <g key={year}>
                                                        {crimeData[key1][crime]["normalizedValue"][year].map((item, k) => {
                                                            if (year !== "2018" && k === 0) {
                                                                preData = crimeData[key1][crime]["normalizedValue"][String(parseFloat(year) - 1)][11]
                                                            } else {
                                                                preData = crimeData[key1][crime]["normalizedValue"][year][Math.max(0, k - 1)]
                                                            }
                                                            //console.log(item)
                                                            return (
                                                                <g key = {i + j + k} >
                                                                    <g>
                                                                        <line
                                                                            x1={Math.max(0, 40 * (j * 12 + k - 1))}
                                                                            y1={height - preData * (height - 65) - 15}
                                                                            x2={40 * (j * 12 + k)}
                                                                            y2={height - item * (height - 65) - 15}
                                                                            stroke="#888"
                                                                            fill = {colors[crime]}

                                                                        />
                                                                    </g>
                                                                    <g
                                                                        key={item}
                                                                        transform={`translate(${40 * (j * 12 + k)}, 0)`}
                                                                    >
                                                                        <ellipse
                                                                            cx={0}
                                                                            cy={height - item * (height - 65) - 15}
                                                                            rx="5"
                                                                            ry="5"
                                                                            fill={colors[crime]}
                                                                            data-tip={"正規化前の認知件数：" + crimeData[key1][crime]["value"][year][Math.max(0, k - 1)]}></ellipse>


                                                                        <text
                                                                            x="15"
                                                                            y={height + 15}
                                                                            textAnchor="end"
                                                                            dominantBaseline="central"
                                                                            transform="translate(581, 630) rotate(90)"
                                                                        >
                                                                            {year + "年" + yLavel[k].padStart(2, "0") + "月"}
                                                                        </text>
                                                                    </g>
                                                                    <g
                                                                        key={5000 * i}
                                                                        transform={`translate(0, ${-50 * (j * 12 + k + 1)})`}
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
                                                                            {(0.1 * (k + 1)).toFixed(2)}
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
                                                        })}
                                                    </g>
                                                )
                                            })
                                            }
                                        </g>
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