<script lang="ts">
    export let line: { user: string; data: number[] };
    export let color: { [key: string]: string };
    export let yScaling: number;
    export let height: number;
    export let margins: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    export let bar_width: number;
    export let gap: number;
    export let selected_user: string;
    export let hovered_data: {
        user: string;
        value: number;
        x: number;
        y: number;
    };

    function createPoints(
        line: { user: string; data: number[] },
        yScaling: number,
        height: number,
        margins: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        },
        bar_width: number,
        gap: number
    ): { x: number; y: number }[] {
        function point(index: number): { x: number; y: number } {
            return {
                x:
                    margins.left +
                    (index + 1) * gap +
                    (index + 1 / 2) * bar_width,
                y: height - margins.bottom - yScaling * line.data[index],
            };
        }

        let points = [point(0)];
        line.data.forEach((_, index) => {
            points.push(point(index));
        });

        points.push(point(line.data.length - 1));
        return points;
    }

    let points: { x: number; y: number }[] = [];
    $: points = createPoints(line, yScaling, height, margins, bar_width, gap);

    function cubicSplineInterpolation(
        points: { x: number; y: number }[]
    ): { x: number; y: number }[] {
        const n = points.length - 1;
        const h = new Array(n);
        const b = new Array(n);
        const u = new Array(n);
        const v = new Array(n);

        for (let i = 0; i < n; i++) {
            h[i] = points[i + 1].x - points[i].x;
            b[i] = (points[i + 1].y - points[i].y) / h[i];
        }

        u[1] = 2 * (h[0] + h[1]);
        v[1] = 6 * (b[1] - b[0]);

        for (let i = 2; i < n; i++) {
            u[i] = 2 * (h[i] + h[i - 1]) - (h[i - 1] * h[i - 1]) / u[i - 1];
            v[i] = 6 * (b[i] - b[i - 1]) - (h[i - 1] * v[i - 1]) / u[i - 1];
        }

        const z = new Array(n);
        z[n - 1] = 0;

        for (let i = n - 2; i > 0; i--) {
            z[i] = (v[i] - h[i] * z[i + 1]) / u[i];
        }

        z[0] = 0;
        z[n] = 0;

        const result = new Array<{ x: number; y: number }>();

        for (let i = 0; i < n; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const hh = h[i];
            const bb = b[i];
            const zz = z[i];
            const zz1 = z[i + 1];

            for (let x = p0.x; x <= p1.x; x++) {
                const t = (x - p0.x) / hh;
                const a = p0.y;
                const b = bb - (hh / 6) * (zz + 2 * zz1);
                const c = zz / 2;
                const d = (zz1 - zz) / (6 * hh);
                result.push({ x, y: a + (b + (c + d * t) * t) * t });
            }
        }

        return result;
    }

    let splinePoints = [];
    $: splinePoints =
        points.length == 0 ? [] : cubicSplineInterpolation(points);
    let pathData;
    $: pathData = splinePoints
        .map((point, index) => {
            if (index === 0) {
                return `M ${point.x} ${point.y}`;
            } else {
                return `L ${point.x} ${point.y}`;
            }
        })
        .join(" ");
</script>

{#each line.data as value, index}
    <circle
        cx={points[index + 1].x}
        cy={points[index + 1].y}
        r={5}
        stroke="black"
        fill={color[line.user]}
        stroke-opacity={selected_user
            ? selected_user == line.user
                ? 1
                : 0.5
            : 0.5}
        opacity={selected_user ? (selected_user == line.user ? 1 : 0.5) : 1}
        on:mouseover={() => {
            selected_user = line.user;
            hovered_data = {
                user: line.user,
                value: value,
                x:
                    margins.left +
                    (index + 1) * gap +
                    (index + 1 / 2) * bar_width +
                    10,
                y: height - margins.bottom - yScaling * value - 35,
            };
        }}
        on:focus={() => {
            selected_user = line.user;
            hovered_data = {
                user: line.user,
                value: value,
                x:
                    margins.left +
                    (index + 1) * gap +
                    (index + 1 / 2) * bar_width +
                    10,
                y: height - margins.bottom - yScaling * value - 35,
            };
        }}
        on:mouseout={() => {
            selected_user = null;
        }}
        on:blur={() => {
            selected_user = null;
        }}
    />
    {#if index > 1 && index < 3}
        <path d={pathData} stroke="black" fill="none" />
    {/if}
{/each}

<style>
    circle {
        cursor: pointer;
    }
</style>
