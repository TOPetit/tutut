<script lang="ts">
    type Options = {
        senders: { [key: string]: boolean };
        type: { [key: string]: boolean };
        content: string;
        dateWindow: { start: string; end: string };
        page_number: number;
        page_size: number;
    };

    const types: { [key: number]: string } = {
        0: "Non défini",
        1: "Correct",
        2: "Erreur",
        3: "Coeur Bleu",
        4: "Duplicat",
    };

    export let options: Options;
</script>

<div class="sorter">
    <div class="filter" id="senders">
        {#each Object.keys(options.senders) as sender}
            <label>
                <input type="checkbox" bind:checked={options.senders[sender]} />
                <!-- svelte-ignore a11y-label-has-associated-control -->
                {sender}</label
            >
        {/each}
    </div>
    <div class="filter" id="content">
        Contenu du message : <input type="text" bind:value={options.content} />
    </div>
    <div id="date">
        <label
            >Entre le <input
                type="date"
                bind:value={options.dateWindow.start}
            /></label
        >
        <label>
            et le <input
                type="date"
                bind:value={options.dateWindow.end}
            /></label
        >
    </div>
    <div class="filter" id="type">
        {#each Object.keys(options.type) as type}
            <label>
                <input type="checkbox" bind:checked={options.type[type]} />
                <!-- svelte-ignore a11y-label-has-associated-control -->
                {types[Number(type)]}</label
            >
        {/each}
    </div>
    <div class="filter" id="page_manager">
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
    <div class="filter" id="reset">
        <button
            on:click={() => {
                options = {
                    senders: { Jodie: true, Matthieu: true, Théo: true },
                    type: { 1: true, 2: true, 3: true, 4: true },
                    content: "",
                    dateWindow: { start: "", end: "" },
                    page_number: 1,
                    page_size: 10,
                };
            }}>Reset</button
        >
    </div>
</div>

<style>
    .sorter {
        width: 90%;
        height: 250px;
        outline: 1px solid black;
        margin: 20px 0 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 15px;
    }

    .filter {
        display: flex;
        gap: 15px;
        align-items: center;
        justify-content: center;
    }

    .filter > label {
        display: flex;
        align-items: center;
        justify-content: center;
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
