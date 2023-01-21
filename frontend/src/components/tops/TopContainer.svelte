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
        <div class="reactions">
            {#each message.reactions as reaction}
                <div class="reaction"><p>{reaction.emoji}</p></div>
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
        transition: all ease 0.3s;
        outline: 1px solid rgba(169, 169, 169, 1);
    }

    .message:hover {
        scale: 1.05;
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
        width: 50%;
    }

    .reactions {
        width: 15%;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
</style>
