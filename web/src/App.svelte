<script lang="ts">
    import Canvas from "./Canvas.svelte";
    import Morse, { freq, amp, message } from "./Morse.svelte";
    import { ws } from "./Websocket";

    const morse = (freq: number, amp: number) => {
        ws.send(
            JSON.stringify({
                freq: freq,
                amp: amp,
            })
        );
    };

    const morseMessage = (ws: WebSocket) =>
        (ws.onmessage = async (e) => {
            const text = await e.data.text();
            const object = JSON.parse(text);
            if (object.freq == $freq) {
                $message += "-";
            }
        });

    morseMessage(ws);
</script>

<main>
    <h1>Amateur Radio Emulator</h1>
    <div>
        <Canvas />
        <button on:click={() => morse($freq, $amp)}> morse </button>
        <Morse />
    </div>
</main>

<style>
</style>
