<script lang="ts">
  import "./style/font.css";
  import Title from "./lib/Title.svelte";
  import Tile from "./components/tile/Tile.svelte";
  import PieChart from "./components/charts/pie/PieChart.svelte";
  import BarChart from "./components/charts/bar/BarChart.svelte";
  import data from "../../data_generator/build/Data/data.json";
</script>

<Title content="Stutustiques du Voyage au centre de la terre" />
<div class="tile-container">
  {#each data.tiles as tile}
    <Tile title={tile.name} values={tile.values} color={data.color} />
  {/each}
</div>

<BarChart />
<PieChart />

<style>
  .tile-container {
    width: 85%;
    margin: auto;
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
  }
</style>
