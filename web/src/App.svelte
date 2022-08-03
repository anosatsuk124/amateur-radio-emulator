<script lang="ts">
    import Canvas from "./Canvas.svelte";
    import Morse, { freq, amp, message } from "./Morse.svelte";
    import { ws } from "./Websocket";
    import { onMount } from "svelte";

    let morseButton: HTMLElement;

    const morse = (freq: number, amp: number) => {
        const json = JSON.stringify({
            freq: freq,
            amp: amp,
        });
        ws.send(json);
        console.log(json);
    };

    onMount(() => {
        const node = morseButton;

        node.addEventListener("mousedown", () => {
            node.addEventListener("mouseup", () => clearInterval(loop));
            morse($freq, $amp);
            const loop = setInterval(() => {
                morse($freq, $amp);
            }, 1);
        });

        node.addEventListener("touchstart", () => {
            node.addEventListener("touchend", () => clearInterval(loop));
            morse($freq, $amp);
            const loop = setInterval(() => {
                morse($freq, $amp);
            }, 1);
        });
    });

    /*
    const morseMessage = (ws.onmessage = async (e) => {
        const text = await e.data.text();
        const object = JSON.parse(text);
        if (object.freq == $freq) {
            $message += "-";
        }
    });
    */
</script>

<main>
    <h1>Amateur Radio Emulator</h1>
    <div id="morse">
        <Canvas />
        <button bind:this={morseButton}> morse </button>
        <Morse />
    </div>
</main>

<style>
    #morse {
        user-select: none;
    }
</style>
