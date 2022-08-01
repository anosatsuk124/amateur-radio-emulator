<script lang="ts" context="module">
    import { writable, derived } from "svelte/store";

    const freq = writable(20);
    const amp = writable(10);
    let message = writable("");

    export { freq, amp, message };
</script>

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
    <p>{$message}</p>
</div>
