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
    export let small_gap: number;
    export let gap: number;
    export let bar_width: number;
    export let nb_users: number;

    const length: number = labels.length;

    let ticks: number[] = [];
    const tick_gap: number =
        nb_users * bar_width + gap + (nb_users - 1) * small_gap;
    for (let i = 0; i < length; i++) {
        ticks.push(margins.left + gap / 2 + (0.5 + i) * tick_gap);
    }
</script>

<line
    x1="0"
    y1={height - margins.bottom}
    x2={width}
    y2={height - margins.bottom}
    stroke="#cecece"
/>
{#each ticks as tick, i}
    <text
        x={tick}
        y={height - margins.bottom + 20}
        fill={"#aeaeae"}
        text-anchor="middle">{labels[i]}</text
    >
{/each}
