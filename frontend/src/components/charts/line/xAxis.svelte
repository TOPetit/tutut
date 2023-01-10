<script lang="ts">
    export let width: number;
    export let height: number;
    export let labels: string[];
    export let margins: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    export let gap: number;
    export let bar_width: number;

    const length: number = labels.length;

    let ticks: number[] = [];
    let tick_gap: number;
    $: tick_gap = bar_width + gap;
</script>

<g>
    <line
        x1={margins.left / 2}
        y1={height - margins.bottom}
        x2={width - margins.right / 2}
        y2={height - margins.bottom}
        stroke="#cecece"
    />
    {#each labels as label, i}
        <text
            x={margins.left + gap / 2 + (0.5 + i) * tick_gap}
            y={height - margins.bottom + 16}
            fill={"#aeaeae"}
            text-anchor="middle">{label}</text
        >
    {/each}
</g>

<style>
    * {
        transition: all ease 0.3s;
    }
</style>
