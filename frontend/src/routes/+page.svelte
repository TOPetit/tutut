<script lang="ts">
    import "../style/font.css";
    import "../style/body.css";
    import Title from "../lib/design/Title.svelte";
    import Footer from "../lib/design/Footer.svelte";
    import TileContainer from "../lib/components/tile/TileContainer.svelte";
    import LineChart from "../lib/components/charts/line/LineChart.svelte";
    import StackedBarChart from "../lib/components/charts/stackedBar/StackedBarChart.svelte";
    import Top from "../lib/components/tops/Top.svelte";
    import data from "../../../data_generator/build/Data/data.json";

    let width: number = 300;
    let height: number = 1080;

    const tututs_per_day =
        data.charts.bar["Fréquence des tututs dans la semaine"];
    const tututs_per_second =
        data.charts.bar["Fréquence des tututs dans la minute"];
    const cumulative_tututs = data.charts.bar["Nombre de tututs cumulé"];
</script>

<svelte:head>
    <title>Stutustiques</title>
</svelte:head>

<div class="page" bind:clientWidth={width} bind:clientHeight={height}>
    <Title content="Stutustiques du Voyage au centre de la terre" />
    <TileContainer tiles={data.tiles} color={data.color} />
    <Top width={0.9 * width} tops={data.tops} color={data.color} />
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
    <LineChart
        width={0.9 * width}
        height={500}
        data={cumulative_tututs.data.data}
        labels={cumulative_tututs.data.labels}
        color={data.color}
        name={cumulative_tututs.name}
    />
    <Footer />
</div>

<style>
    .page {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
</style>
