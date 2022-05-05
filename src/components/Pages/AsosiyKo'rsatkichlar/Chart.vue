<template>
  <canvas id="myChart" width="300" height="150"></canvas>
</template>

<script>
export default {
  props: {
    statistic: Object,
  },
  mounted() {
    console.clear();
    const ctx = document.getElementById("myChart").getContext("2d");
    setTimeout(() => {
      console.log(this.statistic);
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Savdo", "Chiqim", "Nasiya", "Kirim"],
          datasets: [
            {
              data: [
                this.statistic.sum_order_price,
                this.statistic.sum_expense_price,
                this.statistic.sum_loan_price,
                this.statistic.sum_income_price
              ],
              backgroundColor: [
                "lightgreen",
                "lightpink",
                "lightyellow",
                "lightblue",
              ],
              borderColor: ["green", "red", "gold", "blue"],
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
    }, 500);
  },
};
</script>

<style>
</style>