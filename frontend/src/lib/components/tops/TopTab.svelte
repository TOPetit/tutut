<script lang="ts">
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
    export let tab: Top;
    export let selected_tab: Top;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<p
    on:click={() => {
        selected_tab = tab;
    }}
    style="background-color: {selected_tab == tab
        ? 'rgba(0,0,0,0.1)'
        : 'rgba(0,0,0,0)'}"
>
    {tab.name}
</p>

<style>
    p {
        margin: auto;
        border: 2px solid black;
        cursor: pointer;
        padding: 2px;
        transition: all ease 0.3s;
        background-color: white;
    }

    p:hover {
        border: 2px solid rgba(0, 0, 0, 0);
    }
</style>
