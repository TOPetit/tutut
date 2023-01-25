<script lang="ts">
    import Message from "./Message.svelte";

    type Reaction = {
        sender: string;
        emoji: string;
    };

    type Message = {
        type: number;
        sender: string;
        timestamp: number;
        reactions: Reaction[];
        date: string;
        formattedDate: string;
    };

    export let messages: Message[];
</script>

<div class="messages_container">
    {#each messages.slice(0, 10) as message}
        <Message {message} />
    {/each}
</div>

<style>
    .messages_container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        border-top: 1px solid rgba(169, 169, 169, 1);
    }
</style>
