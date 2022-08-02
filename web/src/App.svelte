<script lang="ts">
    import Canvas from "./Canvas.svelte";
    import Morse, { freq, amp, message } from "./Morse.svelte";
    import { ws } from "./Websocket";
    import { onMount } from "svelte";

    let morseButton: HTMLElement;

    const morse = (freq: number, amp: number) => {
        setInterval(
            () =>
                ws.send(
                    JSON.stringify({
                        freq: freq,
                        amp: amp,
                    })
                ),
            100
        );
    };

    onMount(() => {
        const node = morseButton;

        node.addEventListener("mousedown", () => {
            node.addEventListener("mouseup", () => clearInterval(loop));
            node.addEventListener("mousemove", () => clearInterval(loop));
            morse($freq, $amp);
            const loop = setInterval(() => {
                // morse($freq, $amp);
                console.log("hello");
            }, 100);
            console.log("finish");
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
    <div>
        <Canvas />
        <button bind:this={morseButton}> morse </button>
        <Morse />
    </div>
</main>

<style>
</style>
