<template>
    <canvas ref="canvas"></canvas>
</template>

<script>
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  props: ["bmi"],
  watch: {
    bmi(newBmi) {
      this.updateChart(newBmi);
    },
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.canvas.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["BMI"],
          datasets: [
            {
              label: "BMI Value",
              data: [this.bmi],
              backgroundColor: [this.getBackgroundColor(this.bmi)],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 40,
            },
          },
        },
      });
    },
    updateChart(newBmi) {
      if (this.chart) {
        this.chart.data.datasets[0].data = [newBmi];
        this.chart.data.datasets[0].backgroundColor = [this.getBackgroundColor(newBmi)];
        this.chart.update();
      }
    },
    getBackgroundColor(bmi) {
      if (bmi < 18.5) {
        return "#0dcaf0";
      } else if (bmi > 18.5 && bmi <= 24.9) {
        return "#198754";
      } else if (bmi >= 25 && bmi <= 29.9) {
        return "#eed202";
      } else if (bmi >= 30.0 && bmi < 40.0) {
        return "#ffc107";
      } else {
        return "#dc3545";
      }
    },
  },
};
</script>

<style scoped lang="sass">
canvas
  width: 100%
  height: 256px
</style>
