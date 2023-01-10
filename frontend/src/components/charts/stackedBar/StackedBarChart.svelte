<!--
    @component

This compent embbed a bar graph with svg.

Mandatory parameters are:

- width: number
- height: number
- data: { user: string; color: string; data: number[] }[]

Optional parameters are:

- TBD
-->
<script lang="ts">
    import XAxis from "./xAxis.svelte";
    import YAxis from "./yAxis.svelte";
    import Tooltip from "./Tooltip.svelte";
    import Legend from "./Legend.svelte";
    import StackedBar from "./StackedBar.svelte";
    import Title from "./Title.svelte";
    export let width: number = 700;
    export let height: number = 400;

    export let data: { user: string; data: number[] }[] = [
        { user: "Toto", data: [12, 3, 4] },
        { user: "Albert", data: [2, 13, 14] },
        { user: "Walter White", data: [6, 13, 7] },
    ];

    export let color: { [key: string]: string } = {
        Toto: "#aaffaa",
        Albert: "#aaaaff",
        "Walter White": "#ffaaaa",
    };

    export let labels: string[] = ["01/01/2023", "02/01/2023", "03/01/2023"];
    export let name: string;

    const length: number = data[0].data.length;
    const margins = { left: 70, top: 70, right: 20, bottom: 25 };

    let display_user: string[] = data.map((element) => element.user);

    function getData(
        data: { user: string; data: number[] }[],
        display_user: string[]
    ): { user: string; value: number }[][] {
        let result: { user: string; value: number }[][] = [];
        for (let i = 0; i < length; i++) {
            let tmp: { user: string; value: number }[] = [];
            data.forEach((element) => {
                if (display_user.includes(element.user)) {
                    tmp.push({
                        user: element.user,
                        value: element.data[i],
                    });
                }
            });
            result.push(tmp);
        }
        return result;
    }

    let formatted_data: { user: string; value: number }[][] = getData(
        data,
        display_user
    );
    $: formatted_data = getData(data, display_user);

    let data_max: number;
    $: data_max = Math.max(
        ...formatted_data
            .map((element) => element.map((element2) => element2.value))
            .map((element) => element.reduce((acc, curr) => acc + curr, 0))
    );

    let yScaling: number;
    $: yScaling = (height - margins.bottom - margins.top) / data_max;

    let gap: number; // gap between bars
    $: gap = width / (40 * Math.sqrt(length));

    let bar_width: number;
    $: bar_width =
        (width - margins.left - margins.right - length * gap) / length;

    let selected_user: string;
    let hovered_data: { user: string; value: number; x: number; y: number };
</script>

<div>
    <svg
        {height}
        {width}
        on:mouseleave={() => {
            hovered_data = null;
        }}
    >
        <XAxis {width} {height} {labels} {margins} {gap} {bar_width} />
        <YAxis {width} {height} {data_max} {margins} {yScaling} />
        <Legend {width} {data} {color} bind:selected_user bind:display_user />
        {#each formatted_data as stackedBar, i}
            <StackedBar
                {stackedBar}
                {i}
                {color}
                {margins}
                {gap}
                {height}
                {bar_width}
                {yScaling}
                bind:selected_user
                bind:hovered_data
            />
        {/each}
        <Title {name} {width} />
    </svg>
    {#if hovered_data}
        <Tooltip
            user={hovered_data.user}
            value={hovered_data.value}
            x={hovered_data.x}
            y={hovered_data.y}
        />
    {/if}
</div>

<style>
    div {
        position: relative;
        border: 1px solid black;
    }
</style>
