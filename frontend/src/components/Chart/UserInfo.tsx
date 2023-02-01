import React, { ReactNode } from "react";
import './UserInfo.css'
import { Bar, Bubble } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    autocolors,
    PointElement
);

class ChartComponent extends React.Component<any, any> {

    renderDifficultyVNumberChart = (): ReactNode => {
        let difficulty: number[] = []
        let numberSolved: number[] = []
        const n = this.props.array.length;

        let map = new Map<number, number>();

        for (let i = 0; i < n; i++) {
            let rating = this.props.array[i].rating;

            if (map.has(rating)) {
                map.set(rating, map.get(rating)! + 1);
            } else {
                map.set(rating, 1);
            }
        }

        for (let i = 800; i <= 3500; i += 100) {
            difficulty.push(i);
        }

        for (let i of difficulty) {
            if (map.has(i)) {
                numberSolved.push(map.get(i)!);
            } else {
                numberSolved.push(0);
            }
        }

        const chartData = {
            labels: difficulty,
            datasets: [{
                label: 'Number Solved',
                data: numberSolved,
                borderColor: 'black',
                borderWidth: 2,
            }]
        }

        return (
            <div className="chartObject">
                <h3>Difficulty vs Number of problems solved</h3>
                <Bar data={chartData}
                    options={
                        {
                            plugins: {
                                autocolors: {
                                    enabled: true,
                                    mode: 'data'
                                },
                                title: {
                                    display: false,
                                },
                                legend: {
                                    display: false
                                }
                            }
                        }
                    }
                ></Bar>
            </div>
        )
    }

    renderTopicVNumberChart = (): ReactNode => {

        let topics: string[] = [];
        let number: number[] = [];
        let problems = new Map();
        let n = this.props.array.length;

        for (let i = 0; i < n; i += 1) {
            const problem = this.props.array[i];
            for (let j = 0; j < problem.tags.length; j += 1) {
                const tag = problem.tags[j];
                if (problems.has(tag)) {
                    problems.set(tag, problems.get(tag) + 1);
                } else {
                    topics.push(tag);
                    problems.set(tag, 1);
                }
            }
        }

        for (let i of topics) {
            if (problems.has(i)) {
                number.push(problems.get(i));
            } else {
                number.push(0);
            }
        }

        const chartData = {
            labels: topics,
            datasets: [{
                label: 'Number Solved',
                data: number,
                borderColor: 'black',
                borderWidth: 2,
            }]
        }

        return (
            <div className="chartObject">
                <h3>Topics vs Number of problems solved</h3>
                <Bar data={chartData}
                    options={
                        {
                            plugins: {
                                autocolors: {
                                    enabled: true,
                                    mode: 'data'
                                },
                                title: {
                                    display: false,
                                },
                                legend: {
                                    display: false
                                }
                            }
                        }
                    }
                ></Bar>
            </div>
        )
    }

    renderTopicVDifficultyVNumberChart = (): ReactNode => {
        //x -> topic, y -> diff, r -> number
        let points: any[] = [];
        let n = this.props.array.length;
        let labels: string[] = [];
        let labelMap = new Map();
        let idx = 0;

        for (let i = 0; i < n; i++) {
            const problem = this.props.array[i];
            for (let j = 0; j < problem.tags.length; j++) {
                points.push({
                    x: problem.tags[j],
                    y: problem.rating
                })
                if (labelMap.has(problem.tags[j]) === false) {
                    labels.push(problem.tags[j]);
                    labelMap.set(problem.tags[j], idx);
                    idx += 1;
                }
            }
        }

        let map = new Map();

        for (let i = 0; i < n; i++) {
            const problem = this.props.array[i];
            for (let j = 0; j < problem.tags.length; j++) {
                const temp = {
                    x: problem.tags[j],
                    y: problem.rating
                };
                const tempS = JSON.stringify(temp);
                if (map.has(tempS)) {
                    map.set(tempS, map.get(tempS) + 1);
                } else {
                    map.set(tempS, 1);
                }
            }
        }

        let data: any[] = [];
        let count = new Map();

        for (let i of points) {
            const t = JSON.stringify(i);
            if (count.has(t) === false) {
                data.push({
                    ...i,
                    r: map.get(t)
                })
                count.set(t, 1);
            }
        }

        let numericData: any[] = [];


        for (let i of data) {
            let temp = {
                x: labelMap.get(i.x),
                y: i.y,
                r: i.r
            }
            numericData.push(temp);
        }

        const chartData = {
            datasets: [
                {
                    label: "Topics, Difficulty, Number",
                    data: numericData
                }
            ]
        }

        return (
            <div className="chartObject">
                <h3>Topics, Difficulty, Number</h3>
                <Bubble data={chartData}
                    options={
                        {
                            aspectRatio: 1.5,
                            scales: {
                                x: {
                                    position: 'top',
                                    axis: 'x',
                                    ticks: {
                                        z: 1,
                                        stepSize: 1,
                                        callback: function (value: any, index: any, ticks: any) {
                                            return labels[index]
                                        },
                                    },
                                },
                                y: {
                                    axis: 'y',
                                    position: 'right',
                                    ticks: {
                                        z: 1,
                                        stepSize: 100,
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                autocolors: {
                                    enabled: true,
                                    mode: 'data'
                                },
                                title: {
                                    display: false,
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => {
                                            let label = context.dataset.label || '';
                                            if (label) {
                                                label += ': ';
                                            }

                                            label += `(${labels[context.parsed.x]}, ${context.parsed.y}, ${context.parsed._custom})`
                                            return label;
                                        }
                                    }
                                }
                            }
                        }
                    }
                ></Bubble>
            </div>
        )
    }

    constructor(props: any) {
        super(props);
        this.state = {
            arrayProblems: [],
            userName: ''
        }
    }

    render(): ReactNode {
        return (
            <div className="chart">
                {/* TODO: Add color according to CF rating */}
                <h1>{this.props.userName}</h1>
                <h5>Problems Solved: {this.props.array.length}</h5>
                {this.renderDifficultyVNumberChart()}
                <div className="separator"></div>
                {this.renderTopicVNumberChart()}
                <div className="separator"></div>
                {this.renderTopicVDifficultyVNumberChart()}
            </div>
        )
    }
}


export default ChartComponent
