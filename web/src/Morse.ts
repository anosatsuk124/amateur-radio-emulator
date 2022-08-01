import { writable, derived } from "svelte/store";

const freq = writable(20);
const amp = writable(10);
let message = writable("");

export { freq, amp, message };
