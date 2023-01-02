<script lang="ts">
  import BarChart from "./components/charts/bar/BarChart.svelte";
  let data: { user: string; color: string; data: number[] }[] = [
    { user: "Toto", color: "#cecece", data: [12, 3, 4, 6, 11, 0, 1] },
    { user: "Albert", color: "#ceaaaa", data: [2, 13, 14, 0, 11, 5, 2] },
    { user: "Walter White", color: "#aaaace", data: [1, 9, 7, 6, 11, 14, 7] },
  ];
  let labels: string[] = [
    "01/01/2023",
    "02/01/2023",
    "03/01/2023",
    "04/01/2023",
    "05/01/2023",
    "06/01/2023",
    "07/01/2023",
  ];
</script>

<BarChart width={700} height={400} {data} {labels} />
