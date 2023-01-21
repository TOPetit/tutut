import * as Tiles from "./Components/Tiles/";
import { chart_tutut_per_day } from "./Components/Charts/BarCharts/Tutut_per_day";
import { chart_tutut_per_minute } from "./Components/Charts/BarCharts/Tutut_per_minute";
import { top_last_tututs } from "./Components/Tops/last_tututs";
import { top_late_tututs } from "./Components/Tops/late_tututs";
import { top_early_tututs } from "./Components/Tops/early_tututs";
import { top_first_tututs } from "./Components/Tops/first_tututs";
import { top_errors } from "./Components/Tops/errors";
import { line_cumulated_tutut } from "./Components/Charts/LineChart/Cumulative_tututs";
import { Writer } from "./Data/dataWriter";
import { data } from "./Data/dataConverter";

console.log(`Found ${data.messages.length} messages and ${data.participants.length} users.`)

const writer = new Writer(data.participants);
writer.addTile([Tiles.number_of_tutut, Tiles.number_of_errors, Tiles.slowest_tutut, Tiles.fastest_tutut, Tiles.average_tutut_time, Tiles.number_of_blue_hearts]);
writer.addChart([chart_tutut_per_day, chart_tutut_per_minute, line_cumulated_tutut]);
writer.addTop([top_last_tututs, top_first_tututs, top_late_tututs, top_early_tututs, top_errors]);
writer.json();
