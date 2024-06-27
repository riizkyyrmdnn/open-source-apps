<template>
  <section class="stopwatch">
    <HomeButton />
    <div class="container">
      <div class="timer">
        <div class="time hour">{{ pad(hours) }}</div>
        <div>:</div>
        <div class="time minute">{{ pad(minutes) }}</div>
        <div>:</div>
        <div class="time second">{{ pad(seconds) }}</div>
        <div>:</div>
        <div class="time millisecond">{{ pad(milliseconds) }}</div>
      </div>
      <button @click="toggle" class="btn-control"><v-icon :name="isRunning ? 'fa-pause' : 'fa-play'" /></button>
      <button @click="reset" class="btn-restart"><v-icon name="md-restartalt" /></button>
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
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      elapsed: 0,
      intervalId: null,
      isRunning: false
    };
  },
  methods: {
    pad(value) {
      return value.toString().padStart(2, '0');
    },
    toggle() {
      if (this.isRunning) {
        clearInterval(this.intervalId);
      } else {
        this.intervalId = setInterval(() => {
          this.elapsed += 10;
          this.updateTime();
        }, 10);
      }
      this.isRunning = !this.isRunning;
    },
    reset() {
      clearInterval(this.intervalId);
      this.elapsed = 0;
      this.updateTime();
      this.isRunning = false;
    },
    updateTime() {
      this.hours = Math.floor(this.elapsed / (1000 * 60 * 60));
      this.minutes = Math.floor((this.elapsed % (1000 * 60 * 60)) / 60000);
      this.seconds = Math.floor((this.elapsed % 60000) / 1000);
      this.milliseconds = Math.floor((this.elapsed % 1000) / 10);
    }
  }
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.stopwatch
  @include display(flex, center, center)
  min-height: 100vh
  .container
    text-align: center
    padding: 2rem
    background: $col-white
    border-radius: 16px
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
    .timer
      @include display(flex, center, center, 1rem)
      div:nth-child(odd)
        @include display(inline-flex, center, center)
        font-size: calc(80px - 40px)
        font-weight: $fw-semibold
        width: 80px
        height: 80px
        background: $col-white
        border-radius: 8px
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 5px 2px
      div:nth-child(even)
        font-size: calc(80px - 50px)
    .btn-control, .btn-restart
      width: 40px
      height: 40px
      margin: 1rem 0.5rem 0
      background: $col-white
      border-radius: 50%
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px
</style>
