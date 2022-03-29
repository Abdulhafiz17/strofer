<template>
  <canvas id="myChart" width="300" height="150"></canvas>
</template>

<script>
export default {
  mounted() {
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Kirirm", "Chiqim", "Nasiya",],
        datasets: [
          {
            data: [12, 19, 3, 0],
            backgroundColor: [
              "lightgreen",
              "lightpink",
              "lightblue"
            ],
            borderColor: [
              "green",
              "red",
              "blue",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },
};
</script>

<style>
</style>