import App from "./App.svelte";
import { initI18n } from "./i18n";
import { mount } from "svelte";

const target = document.querySelector<HTMLElement>("#app");
if (!target) throw new Error("Missing app root");

initI18n();

export default mount(App, { target });
