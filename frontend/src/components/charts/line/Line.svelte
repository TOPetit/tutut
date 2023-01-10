<script lang="ts">
    import Bar from "../bar/Bar.svelte";

    export let line: { user: string; data: number[] };
    export let color: { [key: string]: string };
    export let yScaling: number;
    export let height: number;
    export let margins: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    export let bar_width: number;
    export let gap: number;
    export let selected_user: string;
    export let hovered_data: {
        user: string;
        value: number;
        x: number;
        y: number;
    };
</script>

{#each line.data as value, index}
    <circle
        cx={margins.left + (index + 1) * gap + (index + 1 / 2) * bar_width}
        cy={height - margins.bottom - yScaling * value}
        r={5}
        stroke="black"
        fill={color[line.user]}
        stroke-opacity={selected_user
            ? selected_user == line.user
                ? 1
                : 0.5
            : 0.5}
        opacity={selected_user ? (selected_user == line.user ? 1 : 0.5) : 1}
        on:mouseover={() => {
            selected_user = line.user;
            hovered_data = {
                user: line.user,
                value: value,
                x:
                    margins.left +
                    (index + 1) * gap +
                    (index + 1 / 2) * bar_width +
                    10,
                y: height - margins.bottom - yScaling * value - 35,
            };
        }}
        on:focus={() => {
            selected_user = line.user;
            hovered_data = {
                user: line.user,
                value: value,
                x:
                    margins.left +
                    (index + 1) * gap +
                    (index + 1 / 2) * bar_width +
                    10,
                y: height - margins.bottom - yScaling * value - 35,
            };
        }}
        on:mouseout={() => {
            selected_user = null;
        }}
        on:blur={() => {
            selected_user = null;
        }}
    />
{/each}

<style>
    circle {
        cursor: pointer;
    }
</style>
