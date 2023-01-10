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
    export let small_gap: number;
    export let bar_width: number;
    export let yScaling: number;
    export let height;
    export let selected_user;
    export let hovered_data;
</script>
