import * as Tiles from "./Components/Tiles/";
import { Writer } from "./Data/dataWriter";
import { data } from "./Data/dataConverter";

const writer = new Writer(data.participants);
writer.addTile([Tiles.number_of_tutut, Tiles.number_of_errors, Tiles.slowest_tutut, Tiles.fastest_tutut, Tiles.average_tutut_time])
writer.json();
