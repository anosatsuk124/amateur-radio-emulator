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

        ws.onmessage = async (e) => {
            const text = await e.data.text();
            const object = JSON.parse(text);
            $freq = object.freq;
            $amp = object.amp;
        };

        drawBase(ctx, width, height);
        // drawInitialize(ctx, width, height);
        $currentPoint = height / 2;
        setInterval(() => {
            $timer += 1;
            drawInterval(
                ctx,
                width,
                height,
                $freq,
                $amp,
                $timer,
                $currentPoint
            );
        }, 1);
    });
</script>

<canvas bind:this={canvas} width={600} height={600} />
