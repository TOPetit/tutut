<script lang="ts">
    export let user: string;
    export let value: number;
    // export let label: string;
    export let x: number;
    export let y: number;
</script>

<div class="tooltip" style="position: absolute; top:{y}px; left:{x}px">
    <p>{user}: {value}</p>
</div>

<style>
    .tooltip {
        padding: 6px;
        margin: 0 0 0 0;
        background: #fafafa;
        border: 1px solid rgba(0, 0, 0, 0.5);
        pointer-events: none;
        transition: all 300ms ease;
    }

    p {
        margin: 0;
        font-weight: 550;
        font-size: small;
    }
</style>
