import * as Tiles from "./Components/Tiles/";
import { chart_tutut_per_day } from "./Components/Charts/BarCharts/Tutut_per_day";
import { chart_tutut_per_minute } from "./Components/Charts/BarCharts/Tutut_per_minute";
import { Writer } from "./Data/dataWriter";
import { data } from "./Data/dataConverter";

const writer = new Writer(data.participants);
writer.addTile([Tiles.number_of_tutut, Tiles.number_of_errors, Tiles.slowest_tutut, Tiles.fastest_tutut, Tiles.average_tutut_time, Tiles.number_of_blue_hearts]);
writer.addChart(chart_tutut_per_day);
writer.addChart(chart_tutut_per_minute);
writer.json();
