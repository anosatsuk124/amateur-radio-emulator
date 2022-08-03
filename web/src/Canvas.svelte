<script lang="ts">
    import { onMount } from "svelte";
    import {
        drawBase,
        drawInitialize,
        drawInterval,
        drawOnMessage,
    } from "./Graph";
    import { writable } from "svelte/store";
    import { ws } from "./Websocket";

    let canvas: HTMLCanvasElement;
        const timer = writable(0);

    onMount(async () => {
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        ctx.lineWidth = 1;
        drawBase(ctx, width, height);

        setInterval(() => {
            if (width < $timer) {
                ctx.clearRect(0, 0, width, height);
                drawBase(ctx, width, height);
                $timer = 0;
            }
            $timer = drawInterval(ctx, width, height, $timer);
        }, 1);

        ws.onmessage = async (e) => {
            const text = await e.data.text();
            const object = JSON.parse(text);
            const freq = object.freq;
            const amp = object.amp;

            $timer = drawOnMessage(ctx, width, height, $timer, amp);
        };

        // drawInitialize(ctx, width, height);
    });
</script>

<canvas bind:this={canvas} width={600} height={600} />
