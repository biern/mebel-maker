<script lang="ts">
  import { onMount } from "svelte";
  import LeftPanel from "./components/LeftPanel.svelte";
  import RightPanel from "./components/RightPanel.svelte";
  import Workspace from "./components/Workspace.svelte";

  onMount(() => {
    void import("./controller");
  });
</script>

<main class="app-shell">
  <LeftPanel />
  <Workspace />
  <RightPanel />
</main>
