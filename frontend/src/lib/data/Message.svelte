<script lang="ts">
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

    export let message: Message;
</script>

<div class="message">
    <div class="item" id="sender"><p>{message.sender}</p></div>
    <div class="item" id="date"><p>{message.formattedDate}</p></div>
    <div class="item" id="content"><p>{message.content}</p></div>
    <div class="item" id="reactions">
        {#each message.reactions as reaction}
            <p>{reaction.emoji}</p>
        {/each}
    </div>
</div>

<style>
    .message {
        width: 100%;
        min-height: 30px;
        border-bottom: 1px solid rgba(169, 169, 169, 1);
        border-left: 1px solid rgba(169, 169, 169, 1);
        border-right: 1px solid rgba(169, 169, 169, 1);
        cursor: pointer;
        transition: all 0.5s ease;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .message:hover {
        background: #f2ebec;
    }

    .item {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #sender {
        width: 25%;
    }

    #date {
        width: 25%;
    }

    #content {
        width: 25%;
    }

    #reactions {
        width: 25%;
    }

    p {
        margin: 0;
        padding: 2px;
    }
</style>
