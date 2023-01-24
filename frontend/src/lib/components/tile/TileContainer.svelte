<script lang="ts">
    import Tile from "./Tile.svelte";
    export let tiles: {
        name: string;
        values: { user: string; value: string }[];
    }[];
    export let color: { [key: string]: string };
</script>

<div class="tile-container">
    {#each tiles as tile}
        <Tile title={tile.name} values={tile.values} {color} />
    {/each}
</div>

<style>
    .tile-container {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: center;
        gap: 50px;
        flex-wrap: wrap;
    }
</style>
