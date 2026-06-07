declare module "*.svelte" {
  import type { ComponentType } from "svelte";

  const component: ComponentType;
  export default component;
}

declare module "*?raw" {
  const source: string;
  export default source;
}
