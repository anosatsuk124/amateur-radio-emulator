<script lang="ts">
  const ws = new WebSocket("wss://localhost:8080");

  const wsSend = () => {
    ws.send("Hello world");
  };
</script>

<main>
  <h1>Vite + Svelte</h1>
  <button on:click={wsSend}>Send "Hello world"</button>
</main>

<style>
</style>
