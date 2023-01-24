<script lang="ts">
    export let bar: {
        user: string;
        value: number;
    };
    export let color: { [key: string]: string };
    export let x: number;
    export let y: number;
    export let width: number;
    export let height: number;

    export let selected_user: string;
    export let hovered_data: {
        user: string;
        value: number;
        x: number;
        y: number;
    };
</script>

<rect
    class={"rect-" + bar.user}
    {x}
    {y}
    {width}
    {height}
    fill={color[bar.user]}
    stroke="black"
    stroke-opacity={selected_user ? (selected_user == bar.user ? 1 : 0.5) : 0.5}
    on:mouseover={() => {
        selected_user = bar.user;
        hovered_data = {
            user: bar.user,
            value: bar.value,
            x: x + width,
            y: y,
        };
    }}
    on:focus={() => {
        selected_user = bar.user;
        hovered_data = {
            user: bar.user,
            value: bar.value,
            x: x + width,
            y: y,
        };
    }}
    on:mouseout={() => {
        selected_user = null;
    }}
    on:blur={() => {
        selected_user = null;
    }}
    opacity={selected_user ? (selected_user == bar.user ? 1 : 0.5) : 1}
/>

<style>
    rect {
        transition: all 300ms ease;
        cursor: pointer;
    }
</style>
