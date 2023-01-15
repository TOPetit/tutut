import { Data, data } from "../../../Data/dataConverter";
import { BarChart, BarChartData, ChartType } from "../../components";

function compute(data: Data): { data: BarChartData, labels: string[] } {
    let tmp_ChartData: { [key: string]: number[] } = {};
    data.participants.forEach(user => {
        tmp_ChartData[user] = new Array(60).fill(0);;
    })
    data.messages.forEach(message => {
        if (message.isCorrectTutut()) {
            const seconds = message.date.second();
            tmp_ChartData[message.sender][seconds] += 1;
        }
    })
    let chartData: BarChartData = [];
    data.participants.forEach(participant => { chartData.push({ user: participant, data: tmp_ChartData[participant] }); })
    return { data: chartData, labels: Array.from({ length: 60 }, (_, i) => (i % 5 == 0) ? i.toString().padStart(2, '0') : "") }
}

export const chart_tutut_per_minute = new BarChart(ChartType.BAR, 'Fréquence des tututs dans la minute', compute, data);