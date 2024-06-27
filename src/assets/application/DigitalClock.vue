<template>
  <section class="digital-clock">
    <HomeButton />
    <div class="container">
      <div class="wrapper">
        <div class="wrapper--time hour">{{ hour }}</div>
        <div>:</div>
        <div class="wrapper--time minute">{{ minute }}</div>
        <div>:</div>
        <div class="wrapper--time second">{{ second }}</div>
        <div>{{ session }}</div>
      </div>
      <div class="wrapper">
        <span>{{ date }}</span>
        <span>{{ month }}</span>
        <span>{{ year }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import HomeButton from "@component/HomeButton.vue";
export default {
  components: {
    HomeButton,
  },
  data() {
    return {
      hour: '',
      minute: '',
      second: '',
      session: '',
      date: '',
      month: '',
      year: '',
      months: [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ]
    };
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      let hours = now.getHours();
      this.session = hours >= 12 ? "PM" : "AM";

      if (hours === 0) {
        hours = 12;
      }
      if (hours > 12) {
        hours = hours - 12;
      }

      this.hour = this.formatTime(hours);
      this.minute = this.formatTime(now.getMinutes());
      this.second = this.formatTime(now.getSeconds());
      this.date = now.getDate();
      this.month = this.months[now.getMonth()];
      this.year = now.getFullYear();
    },
    formatTime(time) {
      return time < 10 ? `0${time}` : time;
    },
  },
  mounted() {
    this.getCurrentTime();
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.digital-clock
  @include display(flex, center, center)
  font-size: 3rem
  min-height: 100vh
  .container
    text-align: center
    width: max-content
    padding: 1rem 2.5rem
    background: $col-white
    border-radius: 16px
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
    .wrapper:first-child
      @include display(flex, center, center, 1rem)
      div:nth-child(odd)
        @include display(inline-flex, center, center)
        font-size: 100%
        font-weight: $fw-semibold
        width: 80px
        height: 80px
        padding: 0.5rem
        background: $col-white
        border-radius: 8px
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 5px 2px
      div:nth-child(even)
        font-size: $fs-x-large
      div:last-child
        font-size: $fs-smaller
        font-weight: $fw-medium
        padding: 0.3rem
        background: $col-white
        border-radius: 8px
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 5px 2px
    .wrapper:last-child
      @include display(flex, center, center, 0.4rem)
      font-size: $fs-small
      font-weight: $fw-medium
      margin: 1rem auto 0
      padding: 0.2rem 1.8rem
      width: max-content
      background: $col-white
      border-radius: 2rem
</style>
