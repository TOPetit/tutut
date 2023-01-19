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

    interface Point {
        x: number;
        y: number;
    }

    /**
     * Darken a color by a given percentage
     * @param color hexa color in the format '#aaaaaa'
     * @param percentage must be in [0, 1] where 0 is black and 1 does not affect the color
     */
    function darken(color: string, percentage: number): string {
        let tmp: number[] = [
            Number(percentage * parseInt(color.substring(1, 3), 16)),
            Number(percentage * parseInt(color.substring(3, 5), 16)),
            Number(percentage * parseInt(color.substring(5, 7), 16)),
        ];
        return `rgb(${String(tmp[0])}, ${String(tmp[1])}, ${String(tmp[2])})`;
    }

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
    ): Point[] {
        function point(index: number): Point {
            return {
                x:
                    margins.left +
                    (index + 1) * gap +
                    (index + 1 / 2) * bar_width,
                y: height - margins.bottom - yScaling * line.data[index],
            };
        }
        let points: Point[] = [];
        line.data.forEach((_, index) => {
            points.push(point(index));
        });
        return points;
    }

    let points: Point[] = [];
    $: points = createPoints(line, yScaling, height, margins, bar_width, gap);

    interface Line {
        start: Point;
        end: Point;
        anchor_left: Point;
        anchor_right: Point;
    }

    /**
     * Get line equation with slope (p1, p3) passing through p2
     * @param p1 First point for slope
     * @param p2 Line goes through that point
     * @param p3 Second point for slope
     */
    function line_equation(
        p1: Point,
        p2: Point,
        p3: Point
    ): { (x: number): number } {
        let m: number = (p1.y - p3.y) / (p1.x - p3.x);
        let c: number = p2.y - m * p2.x;

        return (x: number): number => {
            return m * x + c;
        };
    }

    function left_anchor(p1: Point, p2: Point, p3: Point): Point {
        let line = line_equation(p1, p2, p3);
        let x: number = (p3.x + p2.x) / 2;
        return { x: x, y: line(x) };
    }

    function right_anchor(p1: Point, p2: Point, p3: Point): Point {
        let line = line_equation(p1, p2, p3);
        let x: number = (p2.x + p1.x) / 2;
        return { x: x, y: line(x) };
    }

    function createLines(points: Point[]): Line[] {
        let lines: Line[] = [];
        for (let index = 0; index < points.length - 1; index++) {
            let line: Line = {} as Line;
            line.start = points[index];
            line.end = points[index + 1];
            line.anchor_left =
                index == 0
                    ? points[0]
                    : left_anchor(
                          points[index - 1],
                          points[index],
                          points[index + 1]
                      );
            line.anchor_right =
                index == points.length - 2
                    ? points[index + 1]
                    : right_anchor(
                          points[index],
                          points[index + 1],
                          points[index + 2]
                      );

            lines = [...lines, line];
        }
        return lines;
    }

    let lines: Line[] = [];
    $: lines = createLines(points);

    function createPath(lines: Line[]): string {
        let result: string = `M ${lines[0].start.x} ${lines[0].start.y}`;
        lines.forEach((e) => {
            result =
                result +
                ` C ${e.anchor_left.x} ${e.anchor_left.y} ${e.anchor_right.x} ${e.anchor_right.y} ${e.end.x} ${e.end.y}`;
        });
        return result;
    }

    let path: string;
    $: path = createPath(lines);
</script>

<g
    on:mouseover={() => {
        selected_user = line.user;
    }}
    on:focus={() => {
        selected_user = line.user;
    }}
    on:mouseout={() => {
        selected_user = null;
    }}
    on:blur={() => {
        selected_user = null;
    }}
>
    {#each line.data as value, index}
        <circle
            cx={points[index].x}
            cy={points[index].y}
            r={4}
            stroke="none"
            fill={darken(color[line.user], 0.9)}
            stroke-opacity={selected_user
                ? selected_user == line.user
                    ? 1
                    : 0.5
                : 0.5}
            opacity={selected_user ? (selected_user == line.user ? 1 : 0.5) : 1}
            on:mouseover={() => {
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
        />
    {/each}
    <path
        d={path}
        stroke={darken(color[line.user], 0.9)}
        stroke-width={3}
        fill="none"
        stroke-opacity={selected_user
            ? selected_user == line.user
                ? 1
                : 0.5
            : 1}
    />
</g>

<style>
    circle,
    path {
        cursor: pointer;
    }

    * {
        outline: none;
    }
</style>
