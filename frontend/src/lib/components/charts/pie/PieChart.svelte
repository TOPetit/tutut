<!--
    @component

This compent embbed a pie graph with svg.

Mandatory parameters are:

- width: number
- height: number
- data: { user: string; color: string; data: number }[]

Optional parameters are:

- TBD
-->
<script lang="ts">
    export let width: number = 300;
    export let height: number = 300;
    export let data: { user: string; data: number }[] = [
        { user: "Toto", data: 134 },
        { user: "Albert", data: 234 },
        { user: "Walter White", data: 16 },
    ];
    export let color: { [key: string]: string } = {
        Toto: "#aaffaa",
        Albert: "#aaaaff",
        "Walter White": "#ffaaaa",
    };

    let total: number = data.reduce((acc, curr) => {
        return acc + curr.data;
    }, 0);

    let size: number = Math.min(width, height) - 10;

    let labels: string[] = data.map(
        (element) => ((element.data * 100) / total).toFixed(2) + "%"
    );

    let selected_user: { user: string; data: number };
</script>

<div>
    <svg {width} {height}>
        {#each data as circle, index}
            <path
                class="pie-chunk"
                cursor="pointer"
                fill={color[circle.user]}
                opacity={selected_user
                    ? selected_user == circle
                        ? 1
                        : 0.5
                    : 1}
                stroke="black"
                stroke-linejoin="round"
                stroke-opacity={selected_user
                    ? selected_user == circle
                        ? 1
                        : 0.5
                    : 1}
                d="M{width / 2},{height / 2}L{width / 2 + size / 2},{height /
                    2}A{size / 2},{size / 2},0,{circle.data / total > 0.5
                    ? 1
                    : 0},1,{width / 2 +
                    (size / 2) *
                        Math.cos(2 * Math.PI * (circle.data / total))},{width /
                    2 +
                    (size / 2) *
                        Math.sin(2 * Math.PI * (circle.data / total))}Z"
                shape-rendering="auto"
                style="stroke-linejoin: round; transform-origin: center; transform: rotate({index ==
                0
                    ? 0
                    : data.slice(0, index).reduce((acc, curr) => {
                          return acc + curr.data;
                      }, 0) / total}turn);"
                on:mouseover={() => {
                    selected_user = circle;
                }}
                on:focus={() => {
                    selected_user = circle;
                }}
                on:mouseout={() => {
                    selected_user = null;
                }}
                on:blur={() => {
                    selected_user = null;
                }}
            />
            <text
                x={width / 2 +
                    (size / 3.5) *
                        Math.cos(
                            2 *
                                Math.PI *
                                ((data.slice(0, index).reduce((acc, curr) => {
                                    return acc + curr.data;
                                }, 0) +
                                    circle.data / 2) /
                                    total)
                        )}
                y={width / 2 +
                    (size / 3.5) *
                        Math.sin(
                            2 *
                                Math.PI *
                                ((data.slice(0, index).reduce((acc, curr) => {
                                    return acc + curr.data;
                                }, 0) +
                                    circle.data / 2) /
                                    total)
                        )}
                pointer-events="none"
                dy={5}
                fill="black"
                text-anchor="center">{labels[index]}</text
            >
        {/each}
    </svg>
</div>

<style>
    div {
        position: relative;
    }

    .pie-chunk {
        transition: all 300ms ease;
        cursor: pointer;
    }
</style>
