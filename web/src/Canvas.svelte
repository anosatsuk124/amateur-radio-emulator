<script lang="ts">
    import { onMount } from "svelte";
    import { drawBase, drawInitialize, drawInterval } from "./Graph";
    import { writable } from "svelte/store";
    import { ws } from "./Websocket";

    let canvas: HTMLCanvasElement;
    const timer = writable(0);
    const freq = writable(0);
    const amp = writable(0);
    const currentPoint = writable(0);

    onMount(() => {
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        ctx.lineWidth = 5;

        ws.onmessage = async (e) => {
            const text = await e.data.text();
            const object = JSON.parse(text);
            $freq = object.freq;
            $amp = object.amp;

            $currentPoint = height / 2;
            setInterval(() => {
                $timer += 1;
                $currentPoint = $amp;
                drawInterval(
                    ctx,
                    width,
                    height,
                    $freq,
                    $amp,
                    $timer,
                    $currentPoint
                );
            }, 100000);
        };

        drawBase(ctx, width, height);
        // drawInitialize(ctx, width, height);
    });
</script>

<canvas bind:this={canvas} width={600} height={600} />
