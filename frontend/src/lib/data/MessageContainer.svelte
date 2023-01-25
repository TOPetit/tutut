<script lang="ts">
    import Message from "./Message.svelte";
    import Sorter from "./Sorter.svelte";

    type Reaction = {
        sender: string;
        emoji: string;
    };

    type Message = {
        type: number;
        sender: string;
        timestamp: number;
        content: string;
        reactions: Reaction[];
        date: string;
        formattedDate: string;
    };

    type Options = {
        senders: { [key: string]: boolean };
        type: { [key: string]: boolean };
        content: string;
        dateWindow: { start: string; end: string };
    };

    export let messages: Message[];

    let displayed_messages: Message[] = messages.slice(0, 10);
</script>

<Sorter />

<div class="messages_container">
    {#each displayed_messages as message}
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
