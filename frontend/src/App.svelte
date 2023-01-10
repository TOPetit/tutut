<script lang="ts">
  import "./style/font.css";
  import "./style/body.css";
  import Title from "./lib/Title.svelte";
  import TileContainer from "./components/tile/TileContainer.svelte";
  import PieChart from "./components/charts/pie/PieChart.svelte";
  import BarChart from "./components/charts/bar/BarChart.svelte";
  import StackedBarChart from "./components/charts/stackedBar/StackedBarChart.svelte";
  import data from "../../data_generator/build/Data/data.json";

  let width: number = 300;
  let height: number = 1080;

  const tututs_per_day =
    data.charts.bar["Fréquence des tututs dans la semaine"];
  const tututs_per_second =
    data.charts.bar["Fréquence des tututs dans la minute"];
</script>

<div class="page" bind:clientWidth={width} bind:clientHeight={height}>
  <Title content="Stutustiques du Voyage au centre de la terre" />
  <TileContainer tiles={data.tiles} color={data.color} />
  <StackedBarChart
    width={0.9 * width}
    height={500}
    data={tututs_per_day.data.data}
    labels={tututs_per_day.data.labels}
    color={data.color}
    name={tututs_per_day.name}
  />
  <StackedBarChart
    width={0.9 * width}
    height={500}
    data={tututs_per_second.data.data}
    labels={tututs_per_second.data.labels}
    color={data.color}
    name={tututs_per_second.name}
  />
</div>

<style>
  .page {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
</style>
