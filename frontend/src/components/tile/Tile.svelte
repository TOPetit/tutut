<script lang="ts">
    export let title: string = "Blank Title";
    export let values: { user: string; value: string }[] = [
        { user: "Toto", value: "1234" },
        { user: "Albert", value: "Not really interesting" },
        { user: "Walter White", value: "abc" },
    ];
</script>

<div>
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
        width: 300px;
        height: 150px;
        border: 1px solid #cecece;
        border-radius: 10px;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    h1 {
        margin-top: 5px;
    }

    ul,
    li,
    p {
        margin: 0 0 0 0;
        padding: 0 0 0 0;
    }

    ul {
        width: 90%;
        list-style-type: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
    }

    li {
        display: flex;
        justify-content: space-evenly;
        gap: 15px;
    }

    .user {
        width: 40%;
        margin-left: 20px;
    }

    .value {
        width: 55%;
    }
</style>
