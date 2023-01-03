<script lang="ts">
    export let width: number;
    export let height: number;
    export let data_max: number;
    export let margins: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    export let yScaling: number;

    let ticks: { value: number; label: string }[] = [];
    let tick_gap: number = data_max / 5;

    for (let i = 0; i < 5; i++) {
        ticks.push({
            label: String(Math.round((i + 1) * tick_gap)),
            value:
                height -
                margins.bottom -
                Math.round((i + 1) * yScaling * tick_gap),
        });
    }
    console.log(ticks);
</script>

<g>
    {#each ticks as tick}
        <line
            x1={margins.left - 5}
            y1={tick.value}
            x2={margins.left}
            y2={tick.value}
            stroke={"#8e8e8e"}
        />
        <line
            x1={margins.left - 5}
            y1={tick.value}
            x2={width}
            y2={tick.value}
            stroke={"#eeeeee"}
        />
        <text
            x={margins.left - 15}
            y={tick.value + 4}
            fill="#aeaeae"
            text-anchor="middle">{tick.label}</text
        >
    {/each}
    <line
        x1={margins.left}
        y1={margins.top / 2}
        x2={margins.left}
        y2={height - margins.bottom / 2}
        stroke="#cecece"
    />
</g>
