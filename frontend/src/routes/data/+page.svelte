<script lang="ts">
    import "../../style/font.css";
    import complete_data from "../../../../data_generator/build/Data/complete_data.json";
    import MessageContainer from "../../lib/data/MessageContainer.svelte";
</script>

<div class="data-page">
    <MessageContainer messages={complete_data.messages} />
</div>

<style>
    .data-page {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
