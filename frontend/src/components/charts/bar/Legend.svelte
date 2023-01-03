<script lang="ts">
    export let width: number;
    export let height: number;
    export let margins: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    export let data: { user: string; color: string; data: number[] }[];
    export let selected_user: string;

    let legend_size: number = 400;
    let gap: number = 20;
    let length: number = data.length;
    let element_size: number = (legend_size - gap * (length / 2)) / length;
    let rect_size: { dx: number; dy: number } = { dx: 40, dy: 20 };
</script>

<g transform="translate({width / 2 - legend_size / 2}, {5})">
    {#each data as user, i}
        <g
            class="element"
            opacity={selected_user ? (selected_user == user.user ? 1 : 0.5) : 1}
        >
            <rect
                x={i * (element_size + gap)}
                y={0}
                width={rect_size.dx}
                height={rect_size.dy}
                stroke="black"
                fill={user.color}
            />
            <text
                x={i * (element_size + gap) + rect_size.dx + 5}
                y={0}
                dy={15}
                fill="#555555">{user.user}</text
            >
        </g>
    {/each}
</g>

<style>
    .element {
        transition: all 300ms ease;
        cursor: pointer;
    }
</style>
