<script lang="ts">
  import "./style/font.css";
  import BarChart from "./components/charts/bar/BarChart.svelte";
  import PieChart from "./components/charts/pie/PieChart.svelte";
  import Tile from "./components/tile/Tile.svelte";
  import data from "../../data_generator/build/Data/data.json";
  let data_bar: { user: string; color: string; data: number[] }[] = [
    { user: "Toto", color: "#cecece", data: [12, 3, 4, 6, 11, 0, 1] },
    { user: "Albert", color: "#ceaaaa", data: [2, 13, 14, 0, 11, 5, 2] },
    { user: "Walter White", color: "#aaaace", data: [1, 9, 7, 6, 11, 14, 7] },
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
  let data_pie: { user: string; color: string; data: number }[] = [
    { user: "Toto", color: "#cecece", data: 134 },
    { user: "Albert", color: "#ceaaaa", data: 234 },
    { user: "Walter White", color: "#aaaace", data: 16 },
  ];
  let data_tile: { user: string; color: string; value: string }[] = [
    { user: "Albert", color: "#ceaaaa", value: "234" },
    { user: "Toto", color: "#cecece", value: "140" },
    { user: "Walter White", color: "#aaaace", value: "016" },
  ];
</script>

{#each data.tiles as tile}
  <Tile title={tile.name} values={tile.values} />
{/each}
<Tile title={"Wonderful title"} values={data_tile} />
<BarChart width={700} height={400} data={data_bar} {labels} />
<PieChart width={300} height={300} data={data_pie} />
