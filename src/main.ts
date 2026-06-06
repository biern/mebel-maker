import App from "./App.svelte";
import { mount } from "svelte";

const target = document.querySelector<HTMLElement>("#app");
if (!target) throw new Error("Missing app root");

export default mount(App, { target });
