<script lang="ts">
    export let content: string;
</script>

<div>
    <h1>{content}</h1>
</div>

<style>
    div {
        width: 80%;
        margin: auto;
        background-color: rgba(240, 240, 240);
        padding: 5px;
        border: 3px solid #cecece;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h1 {
        margin: 5px;
        text-align: center;
    }
</style>
