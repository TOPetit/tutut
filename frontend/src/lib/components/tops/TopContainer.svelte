<script lang="ts">
    type Message = {
        sender: string;
        timestamp: number;
        content: string;
        date: string;
        formattedDate: string;
        reactions: { emoji: string; sender: string }[];
    };
    export let data: Message[];
    export let color: { [key: string]: string };

    let hovered: Message;
    let tooltip: string;
</script>

{#each data as message, index}
    <div
        class="message"
        style="background-color: {color[message.sender]}"
        on:mouseenter={() => {
            hovered = message;
        }}
        on:mouseleave={() => {
            hovered = undefined;
        }}
    >
        <div class="index"><p>{index + 1}</p></div>
        <div class="sender"><p>{message.sender}</p></div>
        <div class="date"><p>{message.formattedDate}</p></div>
        <div class="content"><p>{message.content}</p></div>
        <div class="reactions">
            {#each message.reactions as reaction}
                <div class="reaction">
                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                    <p
                        on:mouseover={() => {
                            tooltip = message.formattedDate + reaction.sender;
                        }}
                        on:mouseleave={() => {
                            tooltip = undefined;
                        }}
                    >
                        {#if tooltip == message.formattedDate + reaction.sender}
                            {reaction.sender}
                        {:else}
                            {reaction.emoji}
                        {/if}
                    </p>
                </div>
            {/each}
        </div>
    </div>
{/each}

<style>
    div p {
        margin: 0;
        padding: 2px;
    }

    .message {
        width: 100%;
        min-height: 30px;
        margin: auto;
        display: flex;
        justify-content: space-around;
        cursor: pointer;
        transition: all ease 0.6s;
        outline: 1px solid rgba(169, 169, 169, 1);
    }

    .message:hover {
        min-height: 60px;
        font-size: larger;
    }

    div > div {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .index {
        width: 10%;
    }

    .sender {
        width: 25%;
    }

    .date {
        width: 40%;
    }
    .content {
        width: 10%;
    }

    .reactions {
        width: 15%;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
</style>
