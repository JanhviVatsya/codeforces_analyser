import React, { ReactNode } from "react";
import './UserInfo.css'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
} from 'chart.js';
import autocolors from 'chartjs-plugin-autocolors';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    autocolors
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
                label: 'Number Solved: ',
                data: numberSolved,
                borderColor: 'black',
                borderWidth: 2,
            }]
        }

        return (
            <div className="chartObject">
                <Bar data={chartData}
                    options={
                        {
                            plugins: {
                                autocolors: {
                                    enabled: true,
                                    mode: 'data'
                                },
                                title: {
                                    display: true,
                                    text: 'Difficulty vs Number of problems solved'
                                }
                            }
                        }
                    }
                ></Bar>
            </div>
        )
    }

    constructor(props: any) {
        super(props);
        this.state = {
            arrayProblems: [],
            userName: ''
        }

        console.log(this.state.arrayProblems[0]);
    }

    render(): ReactNode {
        return (
            <div className="chart">
                {/* TODO: Add color according to CF rating */}
                <h1>{this.props.userName}</h1>
                {this.renderDifficultyVNumberChart()}
            </div>
        )
    }
}


export default ChartComponent
