<script lang="ts">
    import Bar from "./Bar.svelte";
    export let stackedBar: {
        user: string;
        value: number;
    }[];
    export let i: number;
    export let color: { [key: string]: string };
    export let margins = { left: 40, top: 40, right: 10, bottom: 25 };
    export let gap: number;
    export let bar_width: number;
    export let yScaling: number;
    export let height: number;
    export let selected_user: string;
    export let hovered_data: {
        data: { user: string; value: number }[];
        x: number;
        y: number;
    };
</script>

<g
    on:mouseleave={() => {
        hovered_data = null;
    }}
    on:mouseover={() => {
        hovered_data = {
            data: stackedBar,
            x: margins.left + (i + 1) * (bar_width + gap) + 10,
            y:
                height -
                margins.bottom -
                yScaling *
                    stackedBar.reduce((acc, curr) => {
                        return acc + curr.value;
                    }, 0) -
                10,
        };
    }}
    on:focus={() => {
        hovered_data = {
            data: stackedBar,
            x: margins.left + (i + 1) * (bar_width + gap) + 10,
            y:
                height -
                margins.bottom -
                yScaling *
                    stackedBar.reduce((acc, curr) => {
                        return acc + curr.value;
                    }, 0) -
                10,
        };
    }}
>
    {#each stackedBar as bar, j}
        <Bar
            {bar}
            {color}
            x={margins.left + (i + 1) * gap + i * bar_width}
            y={height -
                margins.bottom -
                yScaling *
                    stackedBar.slice(0, j + 1).reduce((acc, curr) => {
                        return acc + curr.value;
                    }, 0)}
            width={bar_width}
            height={yScaling * bar.value}
            bind:selected_user
        />
    {/each}
</g>
