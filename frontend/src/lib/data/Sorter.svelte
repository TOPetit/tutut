<script lang="ts">
    import { page } from "$app/stores";

    type Options = {
        senders: { [key: string]: boolean };
        type: { [key: string]: boolean };
        content: string;
        dateWindow: { start: string; end: string };
        page_number: number;
        page_size: number;
    };

    export let options: Options;
</script>

<div class="sorter">
    <div id="page_manager">
        <div class="item" id="page_size">
            Items per page : {options.page_size}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="button"
                on:click={() => {
                    options.page_size += 5;
                }}
            >
                +
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="button"
                on:click={() => {
                    options.page_size = Math.max(10, options.page_size - 5);
                }}
            >
                -
            </div>
        </div>
        <div class="item" id="page_number">
            Page number : {options.page_number}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="button"
                on:click={() => {
                    options.page_number += 1;
                }}
            >
                +
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="button"
                on:click={() => {
                    options.page_number = Math.max(1, options.page_number - 1);
                }}
            >
                -
            </div>
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

    .button {
        width: 20px;
        aspect-ratio: 1;
        background-color: aquamarine;
        text-align: center;
        border-radius: 10px;
        border: 1px solid grey;
        cursor: pointer;
    }

    .item {
        display: flex;
        gap: 20px;
        align-items: center;
    }
</style>
