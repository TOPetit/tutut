<!--
    @component

This compent embbed a bar graph with svg.

Mandatory parameters are:

- title: string.
- values: { user: string; color: string; value: string }[].
Optional parameters are:

- TBD
-->
<script lang="ts">
    export let title: string = "Blank Title";
    export let values: { user: string; value: string }[] = [
        { user: "Toto", value: "1234" },
        { user: "Albert", value: "1234" },
        { user: "Walter White", value: "1234" },
    ];
    export let color: { [key: string]: string };
    const maxChar: number = Math.max(
        ...values.map((tile) => tile.value.length)
    );
    let highlight: boolean = false;
</script>

<div
    style="background-color: {highlight
        ? color[values[0].user]
        : 'rgba(240, 240, 240)'}"
    on:mouseenter={() => {
        highlight = true;
    }}
    on:mouseleave={() => {
        highlight = false;
    }}
>
    <h1>{title}</h1>
    <ul>
        {#each values as { user, value }}
            <li>
                <p class="user">{user}</p>
                <p class="value">{value}</p>
            </li>
        {/each}
    </ul>
</div>

<style>
    div {
        width: 250px;
        height: 120px;
        min-width: 250px;
        min-height: 120px;
        background-color: #334756;
        border-radius: 10px;
        transition: box-shadow 0.3s ease-in-out;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        border: 2px solid rgba(0, 0, 0, 0.2);
        transition: all ease 0.3s;
    }

    div:hover {
        stroke-opacity: 1;
        border: 2px solid rgba(0, 0, 0, 1);
        scale: 1.05;
    }

    h1 {
        text-align: center;
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0;
        letter-spacing: 0.5px;
    }

    ul,
    li,
    p {
        margin: 0 0 0 0;
        padding: 0 0 0 0;
    }

    ul {
        list-style-type: none;
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 0.8rem;
    }

    li {
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: center;
        gap: 10px;
        font-size: 0.8rem;
    }

    .user {
        width: 20%;
    }

    .value {
        padding-left: 5%;
    }
</style>
