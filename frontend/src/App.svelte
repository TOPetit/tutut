<script lang="ts">
  import BarChart from "./components/charts/bar/BarChart.svelte";
  import PieChart from "./components/charts/pie/PieChart.svelte";
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
  let data_pie: { user: string; color: string; data: number }[] = [
    { user: "Toto", color: "#cecece", data: 134 },
    { user: "Albert", color: "#ceaaaa", data: 234 },
    { user: "Walter White", color: "#aaaace", data: 16 },
  ];
</script>

<BarChart width={700} height={400} {data} {labels} />
<PieChart width={300} height={300} data={data_pie} />
