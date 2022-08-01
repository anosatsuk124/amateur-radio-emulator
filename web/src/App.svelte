<script lang="ts">
  const ws = new WebSocket("ws://127.0.0.1:3000");

  ws.onerror = (e) => {
    console.log(`failed to connect:${e}`);
    console.log(e);
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
    console.log(`${text}`);
    if (object.dash) {
      message = message + "-";
    } else {
      message = message + ".";
    }
  });
  $: message = "";
</script>

<main>
  <h1>Amateur Radio Emulator</h1>
  <button on:click={morseDash}>-</button>
  <button on:click={morseDot}>.</button>
  <div>
      <p>{message}</p>
  </div>
</main>

<style>
</style>
