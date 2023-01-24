<script lang="ts">
    import TopTab from "./TopTab.svelte";
    import TopContainer from "./TopContainer.svelte";

    type Top = {
        name: string;
        data: {
            sender: string;
            timestamp: number;
            content: string;
            date: string;
            formattedDate: string;
            reactions: { emoji: string; sender: string }[];
        }[];
    };

    export let width: number;
    export let tops: Top[];
    export let color: { [key: string]: string };

    let selected_tab: Top = tops[0];
</script>

<div class="container" style="width: {width}px">
    <div class="tab-container">
        {#each tops as tab}
            <TopTab {tab} bind:selected_tab />
        {/each}
    </div>
    {#if selected_tab}
        <div class="top-container">
            <TopContainer data={selected_tab.data} {color} />
        </div>
    {/if}
</div>

<style>
    .container {
        margin: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .tab-container {
        margin: auto;
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    .top-container {
        margin: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
