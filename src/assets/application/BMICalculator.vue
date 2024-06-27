<template>
  <section class="bmi-calculator">
    <div class="app-container">
      <HomeButton />
      <h1 class="title">Measure your BMI</h1>
      <form @submit.prevent="calculateBMI" class="form">
        <div class="inputs">
          <div class="inputs--weight">
            <label for="weight">Weight:</label>
            <input v-model.number="weight" id="weight" type="number" required />
            <p class="status">Your weight is <b>{{ weight }}</b> kg</p>
          </div>
          <div class="inputs--height">
            <label for="height">Height:</label>
            <input v-model.number="height" id="height" type="number" required />
            <p class="status">Your height is <b>{{ height }}</b> cm</p>
          </div>
        </div>
        <button type="submit" class="btn-submit">Calculate BMI</button>
      </form>
      <div v-if="bmi !== null">
        <p>Your BMI: <b>{{ bmi.toFixed(3) }}</b></p>
        <p>Status: <b>{{ bmiStatus }}</b></p>
      </div>
      <BMIChart :bmi="bmi"></BMIChart>
    </div>
  </section>
</template>

<script>
import HomeButton from "@component/HomeButton.vue";
import BMIChart from "@component/BMIChart.vue";
export default {
  components: {
    HomeButton,
    BMIChart,
  },
  data() {
    return {
      weight: "?",
      height: "?",
      bmi: null,
    };
  },
  computed: {
    bmiStatus() {
      if (!this.bmi) return "";
      if (this.bmi < 18.5) {
        return "Underweight";
      } else if (this.bmi > 18.5 && this.bmi <= 24.9) {
        return "Healty";
      } else if (this.bmi >= 25 && this.bmi <= 29.9) {
        return "Overweight";
      } else if (this.bmi >= 30.0 && this.bmi < 40.0) {
        return "Obese";
      } else {
        return "Extremely obese";
      }
    },
  },
  methods: {
    calculateBMI() {
      const heightInMeters = this.height / 100;
      this.bmi = this.weight / (heightInMeters * heightInMeters);
    },
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.bmi-calculator
  @include display(flex, center, center)
  min-height: 100vh
  .app-container
    text-align: center
    padding: 0.8rem
    background: $col-white
    border-radius: 16px
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
    .title
      font-size: $fs-xx-large
      font-weight: $fw-bold
      color: $col-primary
    .form
      text-align: left
      .inputs
        @include display(flex, center, center, 1.5rem)
        margin-block: 1.5rem
        label
          display: block
          font-weight: $fw-medium
        input
          font-size: $fs-smaller
          font-weight: $fw-medium
          padding: 0.2rem
        .status
          font-size: $fs-x-small
          color: rgba($col-dark, 0.8)
          b
            color: $col-dark
      .btn-submit
        display: block
        color: $col-white
        margin: 1rem auto
        padding: 0.5rem 4rem
        background: $col-primary
        border-radius: 2rem
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px
</style>
