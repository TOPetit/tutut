import { Data, data } from "../../../Data/dataConverter";
import { BarChart, BarChartData, ChartType } from "../../components";

function compute(data: Data): { data: BarChartData, labels: string[] } {
    let tmp_ChartData: { [key: string]: number[] } = {};
    let labels: string[] = [''];
    let current_day = data.messages[0].date.date()
    data.participants.forEach(user => {
        tmp_ChartData[user] = [0];
    })
    data.messages.forEach(message => {
        if (message.isCorrectTutut()) {
            let day = message.date.date();
            if (day == current_day) {
                tmp_ChartData[message.sender][tmp_ChartData[message.sender].length - 1] += 1;
            }
            else {
                current_day = day;
                data.participants.forEach(user => {
                    tmp_ChartData[user] = [...tmp_ChartData[user], tmp_ChartData[user][tmp_ChartData[user].length - 1]];
                })
                tmp_ChartData[message.sender][tmp_ChartData[message.sender].length - 1] += 1;
                labels.push('');
            }
        }
    })
    let chartData: BarChartData = [];
    data.participants.forEach(participant => { chartData.push({ user: participant, data: tmp_ChartData[participant] }); })
    return { data: chartData, labels: labels }
}

export const line_cumulated_tutut = new BarChart(ChartType.BAR, 'Nombre de tutut cumulé', compute, data);