<script lang="ts">
    import Canvas from "./Canvas.svelte";
    import { freq, amp, message } from "./Morse";

    const ws = new WebSocket("ws://127.0.0.1:3000");

    const morse = (freq: number, amp: number) => {
        ws.send(
            JSON.stringify({
                freq: freq,
                amp: amp,
            })
        );
    };

    const morseDash = () => {
        ws.send(
            JSON.stringify({
                dash: true,
                dot: false,
            })
        );
    };

    const morseDot = () => {
        ws.send(
            JSON.stringify({
                dash: false,
                dot: true,
            })
        );
    };

    const morseMessage = (ws.onmessage = async (e) => {
        const text = await e.data.text();
        const object = JSON.parse(text);
        if (object.freq == $freq) {
            $message += "-";
        }
    });
</script>

<main>
    <h1>Amateur Radio Emulator</h1>
    <button on:click={morseDash}>-</button>
    <button on:click={morseDot}>.</button>
    <div>
        <Canvas />
        <div>
            <div>
                <p>Frequency</p>
                <input type="number" bind:value={$freq} min="0" max="10" />
                <input type="range" bind:value={$freq} min="0" max="10" />
            </div>
            <div>
                <p>Amplitude</p>
                <input type="number" bind:value={$amp} min="0" max="10" />
                <input type="range" bind:value={$amp} min="0" max="10" />
            </div>
            <button on:click={() => morse($freq, $amp)}> morse </button>
            <p>{$message}</p>
        </div>
    </div>
</main>

<style>
</style>
