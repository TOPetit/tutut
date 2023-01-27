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
        page_number: number;
        page_size: number;
    };

    export let messages: Message[];

    let options: Options = {
        senders: { Jodie: true, Matthieu: true, Théo: true },
        type: { 0: true, 1: true, 2: true, 3: true, 4: true },
        content: "",
        dateWindow: { start: "*", end: "*" },
        page_number: 1,
        page_size: 10,
    };

    function filter(messages: Message[], options: Options): Message[] {
        let displayed_data: Message[] = [];
        // Filter data
        messages.forEach((message) => {
            let display_this = true;
            display_this = display_this && options.senders[message.sender];
            display_this =
                display_this &&
                (options.content == "" || options.content == message.content);
            display_this = display_this && options.type[message.type];
            if (display_this) {
                displayed_data = [...displayed_data, message];
            }
        });

        // Display by page
        return displayed_data.slice(
            options.page_size * (options.page_number - 1),
            options.page_size * options.page_number
        );
    }

    let displayed_messages: Message[] = filter(messages, options);
    $: displayed_messages = filter(messages, options);
</script>

<Sorter bind:options />

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
