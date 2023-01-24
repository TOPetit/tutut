<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Data from "./routes/data/Data.svelte";
  import Home from "./routes/Home.svelte";
  export let url: string = "";
  export let basepath: string = "/tutut/";
</script>

<Router {url} {basepath}>
  <Route path="data" component={Data} />
  <Route path="/" component={Home} />
</Router>
