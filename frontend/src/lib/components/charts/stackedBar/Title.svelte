<script lang="ts">
    export let width: number;
    export let name: string;
</script>

<text x={width / 2} y={25} text-anchor="middle" font-size="1.5rem">{name}</text>
