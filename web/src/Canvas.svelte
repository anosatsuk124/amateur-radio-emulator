<script lang="ts">
    import { onMount } from "svelte";
    import { freq, amp } from "./Morse.svelte";
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

        const plotScale = (text: string, x: number, y: number) => {
            ctx.font = "12px serif";
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.fillText(text, x, y);
        };

        const drawScale = () => {
            for (let i = 0; i < width; i += width / 10) {
                plotScale(`${i}`, 5, width - i * 2);
            }
            for (let i = height; 0 < i; i -= height / 10) {
                plotScale(`${i}`, i * 2, height - 5);
            }
        };

        const drawGraph = () => {};

        drawFrame();
        drawScale();
        drawGraph();
    });
</script>

<canvas bind:this={canvas} width={600} height={600} />
