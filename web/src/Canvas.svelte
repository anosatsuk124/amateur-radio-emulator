<script lang="ts">
    import { onMount } from "svelte";
    let canvas: HTMLCanvasElement;

    onMount(() => {
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        const drawFrame = () => {
            ctx.beginPath();
            ctx.moveTo(height, width);
            ctx.lineTo(0, width);
            ctx.moveTo(0, width);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.stroke();
        };
        const drawGraph = () => {};

        drawFrame();
        drawGraph();
    });
</script>

<canvas bind:this={canvas} width={600} height={600} />
