<script lang="ts">
    import { fade } from "svelte/transition";

    export let data: { user: string; value: number }[];
    // export let label: string;
    export let x: number;
    export let y: number;
</script>

<div
    transition:fade
    class="tooltip"
    style="position: absolute; top:{y}px; left:{x}px"
>
    {#each data as line}
        <div class="line">
            <div class="name"><b>{line.user}</b></div>
            <div class="value">{line.value}</div>
        </div>
    {/each}
    <div id="total" class="line">
        <div class="name"><b>Total</b></div>
        <div class="value">
            {data.reduce((acc, curr) => {
                return acc + curr.value;
            }, 0)}
        </div>
    </div>
</div>

<style>
    .tooltip {
        padding: 2px 6px 2px 6px;
        margin: 0 0 0 0;
        background: #fafafa;
        border: 1px solid rgba(0, 0, 0, 0.5);
        pointer-events: none;
        transition: all 300ms ease;
    }

    div > div {
        margin: 0;
        font-weight: 550;
        font-size: small;
    }
    .line {
        min-width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #total {
        margin-top: 5px;
    }
</style>
