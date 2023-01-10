import { Data, data } from "../../../Data/dataConverter";
import { BarChart, BarChartData, ChartType } from "../../components";

function compute(data: Data): { data: BarChartData, labels: string[] } {
    let tmp_ChartData: { [key: string]: number[] } = {};
    data.participants.forEach(user => {
        tmp_ChartData[user] = [0, 0, 0, 0, 0, 0, 0];
    })
    data.messages.forEach(message => {
        if (message.isCorrectTutut()) {
            const dayOfWeek = message.date.getDay();
            tmp_ChartData[message.sender][dayOfWeek == 0 ? 6 : dayOfWeek - 1] += 1;
        }
    })
    let chartData: BarChartData = [];
    data.participants.forEach(participant => { chartData.push({ user: participant, data: tmp_ChartData[participant] }); })
    return { data: chartData, labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] }
}

export const chart_tutut_per_day = new BarChart(ChartType.BAR, 'Tututs par jour de la semaine', compute, data);
