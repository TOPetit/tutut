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
    export let width: number = 500;
    export let height: number = 500;

    export let data: { user: string; color: string; data: number[] }[] = [
        { user: "Toto", color: "#cecece", data: [12, 3, 4] },
        { user: "Albert", color: "#ceaaaa", data: [2, 13, 14] },
        { user: "Walter White", color: "#aaaace", data: [6, 13, 7] },
    ];

    const margins = { left: 40, top: 20, right: 10, bottom: 20 };

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
        console.log("out");
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
    {#each formatted_data as bar, i}
        {#each bar as subBar, j}
            <rect
                class={"rect-" + subBar.user}
                x={margins.left +
                    gap +
                    bar_width * (data.length * i + j) +
                    i * gap +
                    ((data.length - 1) * i + j) * small_gap}
                y={height - margins.bottom - yScaling * subBar.value}
                height={yScaling * subBar.value}
                width={bar_width}
                fill={subBar.color}
                stroke="black"
                stroke-opacity={selected_user
                    ? selected_user == subBar.user
                        ? 1
                        : 0.5
                    : 0.5}
                on:mouseover={() => {
                    selected_user = subBar.user;
                    hovered_data = {
                        user: subBar.user,
                        value: subBar.value,
                        x:
                            margins.left +
                            gap +
                            bar_width * (data.length * i + j) +
                            i * gap +
                            ((data.length - 1) * i + j) * small_gap +
                            bar_width,
                        y: height - margins.bottom - yScaling * subBar.value,
                    };
                }}
                on:focus={() => {
                    selected_user = subBar.user;
                    hovered_data = {
                        user: subBar.user,
                        value: subBar.value,
                        x:
                            margins.left +
                            gap +
                            bar_width * (data.length * i + j) +
                            i * gap +
                            ((data.length - 1) * i + j) * small_gap +
                            bar_width,
                        y: height - margins.bottom - yScaling * subBar.value,
                    };
                }}
                on:mouseout={() => {
                    selected_user = null;
                }}
                on:blur={() => {
                    selected_user = null;
                }}
                opacity={selected_user
                    ? selected_user == subBar.user
                        ? 1
                        : 0.5
                    : 1}
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

<style>
    rect {
        transition: all 300ms ease;
        cursor: pointer;
    }
</style>
