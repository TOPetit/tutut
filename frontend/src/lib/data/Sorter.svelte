<script lang="ts">
    type Options = {
        senders: { [key: string]: boolean };
        type: { [key: string]: boolean };
        content: string;
        dateWindow: { start: string; end: string };
        page_number: number;
        page_size: number;
    };

    export let options: Options;

    $: options.page_number = options.page_number < 1 ? 1 : options.page_number;
</script>

<div class="sorter">
    <div id="senders">
        {#each Object.keys(options.senders) as sender}
            <label>
                <input type="checkbox" bind:checked={options.senders[sender]} />
                <!-- svelte-ignore a11y-label-has-associated-control -->
                {sender}</label
            >
        {/each}
    </div>
    <div id="content">
        Contenu du message : <input type="text" bind:value={options.content} />
    </div>
    <div id="page_manager">
        <div class="item" id="page_size">
            Nombre de lignes affichées : <input
                type="number"
                min={10}
                max={200}
                step={10}
                style="width:40px"
                bind:value={options.page_size}
            />
        </div>
        <div class="item" id="page_number">
            Numéro de page : <input
                type="number"
                style="width:40px"
                bind:value={options.page_number}
            />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
        </div>
    </div>
</div>

<style>
    .sorter {
        width: 90%;
        height: 200px;
        outline: 1px solid black;
        margin: 20px 0 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }

    #page_manager {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-direction: column;
    }

    /* .button {
        width: 20px;
        aspect-ratio: 1;
        background-color: aquamarine;
        text-align: center;
        border-radius: 10px;
        border: 1px solid grey;
        cursor: pointer;
    } */

    .item {
        display: flex;
        gap: 20px;
        align-items: center;
    }
</style>
