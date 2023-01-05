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
    import Bar from "./Bar.svelte";
    export let width: number = 500;
    export let height: number = 500;

    export let data: { user: string; color: string; data: number[] }[] = [
        { user: "Toto", color: "#cecece", data: [12, 3, 4] },
        { user: "Albert", color: "#ceaaaa", data: [2, 13, 14] },
        { user: "Walter White", color: "#aaaace", data: [6, 13, 7] },
    ];

    const margins = { left: 40, top: 40, right: 10, bottom: 25 };

    const allData: number[] = data.flatMap((item) => item.data);
    const data_max: number = Math.max(...allData);
    const yScaling: number = Math.floor(
        (height - margins.bottom - margins.top) / data_max
    );

    const length: number = data[0].data.length;

    export let labels: string[];

    const gap: number = 15; // gap between groups
    const small_gap: number = 5; // gap between bars in same group

    const bar_width: number =
        (width -
            gap -
            margins.left -
            margins.right -
            gap * (length - 1) -
            small_gap * (data.length - 1) * length) /
        (length * data.length);

    let formatted_data: { user: string; color: string; value: number }[][] = [];
    for (let i = 0; i < length; i++) {
        let tmp: { user: string; color: string; value: number }[] = [];
        data.forEach((element) => {
            tmp.push({
                user: element.user,
                color: element.color,
                value: element.data[i],
            });
        });
        formatted_data.push(tmp);
    }

    let selected_user: string;
    let hovered_data: { user: string; value: number; x: number; y: number };
</script>

<svg
    {height}
    {width}
    on:mouseleave={() => {
        hovered_data = null;
    }}
>
    <XAxis
        {width}
        {height}
        {labels}
        {margins}
        {small_gap}
        {gap}
        {bar_width}
        nb_users={data.length}
    />
    <YAxis {width} {height} {data_max} {margins} {yScaling} />
    <Legend {width} {data} bind:selected_user />
    {#each formatted_data as barGroup, i}
        {#each barGroup as bar, j}
            <Bar
                {bar}
                x={margins.left +
                    gap +
                    bar_width * (data.length * i + j) +
                    i * gap +
                    ((data.length - 1) * i + j) * small_gap}
                y={height - margins.bottom - yScaling * bar.value}
                width={bar_width}
                height={yScaling * bar.value}
                bind:selected_user
                bind:hovered_data
            />
        {/each}
    {/each}
</svg>
{#if hovered_data}
    <Tooltip
        user={hovered_data.user}
        value={hovered_data.value}
        x={hovered_data.x}
        y={hovered_data.y}
    />
{/if}
