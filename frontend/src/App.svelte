<script lang="ts">
  import "./style/font.css";
  import BarChart from "./components/charts/bar/BarChart.svelte";
  import PieChart from "./components/charts/pie/PieChart.svelte";
  import Tile from "./components/tile/Tile.svelte";
  import data from "../../data_generator/build/Data/data.json";
  const color: { [key: string]: string } = data.color;
  let data_bar: { user: string; data: number[] }[] = [
    { user: "Toto", data: [12, 3, 4, 6, 11, 0, 1] },
    { user: "Albert", data: [2, 13, 14, 0, 11, 5, 2] },
    { user: "Walter White", data: [1, 9, 7, 6, 11, 14, 7] },
  ];
  let labels: string[] = [
    "01/01/2023",
    "02/01/2023",
    "03/01/2023",
    "04/01/2023",
    "05/01/2023",
    "06/01/2023",
    "07/01/2023",
  ];
  let data_tile: { user: string; value: string }[] = [
    { user: "Albert", value: "234" },
    { user: "Toto", value: "140" },
    { user: "Walter White", value: "016" },
  ];
</script>

{#each data.tiles as tile}
  <Tile title={tile.name} values={tile.values} {color} />
{/each}
<BarChart />
<PieChart />
