<script lang="ts">
    import { onMount } from "svelte";
    import {
        drawBase,
        drawInitialize,
        drawInterval,
        drawOnMessage,
        pushToStack,
        drawStack,
    } from "./Graph";
    import { writable } from "svelte/store";
    import { ws } from "./Websocket";

    let canvas: HTMLCanvasElement;
    const timer = writable(0);
    const stack = writable([]);

    onMount(async () => {
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        ctx.lineWidth = 1;
        drawBase(ctx, width, height);

        setInterval(() => {
            if (10 < $stack.length) {
                drawStack(ctx, width, height, $timer, $stack);
                $stack = [];
            } else {
                $timer = drawInterval(ctx, width, height, $timer);
            }
            if (width < $timer) {
                ctx.clearRect(0, 0, width, height);
                drawBase(ctx, width, height);
                $timer = 0;
            }
        }, 1);

        ws.onmessage = async (e) => {
            const text = await e.data.text();
            const object = JSON.parse(text);
            const freq = object.freq;
            const amp = object.amp;

            $stack = pushToStack(object, $stack);
            //generateBeep(20, 100, 30);
        };

        // drawInitialize(ctx, width, height);
    });
</script>

<canvas bind:this={canvas} width={600} height={600} />
