<script lang="ts">
  import "./style/font.css";
  import "./style/body.css";
  import Title from "./lib/Title.svelte";
  import TileContainer from "./components/tile/TileContainer.svelte";
  import PieChart from "./components/charts/pie/PieChart.svelte";
  import BarChart from "./components/charts/bar/BarChart.svelte";
  import data from "../../data_generator/build/Data/data.json";
</script>

<div class="page">
  <Title content="Stutustiques du Voyage au centre de la terre" />
  <TileContainer tiles={data.tiles} color={data.color} />
  <BarChart />
  <PieChart />
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
