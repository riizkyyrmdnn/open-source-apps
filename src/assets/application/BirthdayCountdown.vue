<template>
  <section class="birthday-countdown">
    <div class="app-container">
      <HomeButton />
      <input
        type="date"
        v-model="dateInput"
        id="dateInput"
        @change="saveDate"
        :disabled="disabledInput"
      />
      <div class="app-container--wrapper">
        <div class="time-box">
          Years <span class="time-box--number year">{{ years }}</span>
        </div>
        <div class="time-box">
          Months <span class="time-box--number mont">{{ months }}</span>
        </div>
        <div class="time-box">
          Weeks <span class="time-box--number week">{{ weeks }}</span>
        </div>
        <div class="time-box">
          Days <span class="time-box--number day">{{ days }}</span>
        </div>
        <div class="time-box">
          Hours <span class="time-box--number hour">{{ hours }}</span>
        </div>
        <div class="time-box">
          Minutes <span class="time-box--number minute">{{ minutes }}</span>
        </div>
        <div class="time-box">
          Seconds <span class="time-box--number second">{{ seconds }}</span>
        </div>
        <div v-if="message">{{ message }}</div>
      </div>
      <div class="app-container--buttons">
        <button @click="start" :disabled="disableStart" class="button start">Start</button>
        <button @click="showAction" :disabled="disableReset" class="button restart">Restart</button>
        <button @click="newBirthday" :disabled="disableNew" class="button new">
          New Birthday
        </button>
      </div>
    </div>
    <ActionModal
      :showAction="isAction"
      @confirm="handleConfirm"
      @close="isAction = false"
    />
  </section>
</template>

<script>
import HomeButton from "@component/HomeButton.vue";
import ActionModal from "@component/ActionModal.vue";
export default {
  components: {
    HomeButton,
    ActionModal,
  },
  data() {
    return {
      dateInput: "",
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      message: "",
      disabledInput: true,
      disableStart: true,
      disableReset: true,
      disableNew: false,
      isAction: false,
    };
  },
  watch: {
    dateInput() {
      this.calculateTime();
    },
  },
  methods: {
    saveDate() {
      localStorage.setItem("birthdayDate", this.dateInput);
      this.disableStart = false;
      this.saveButtonStates();
    },
    calculateTime() {
      const savedDate = localStorage.getItem("birthdayDate");
      if (!savedDate) return;

      const birthdayDate = new Date(savedDate);
      const now = new Date();
      const countdownTime = birthdayDate - now;

      if (countdownTime < 0) {
        this.message = "Happy Birthday!";
        this.clearTime();
        return;
      }

      this.message = "";
      this.seconds = Math.floor((countdownTime / 1000) % 60);
      this.minutes = Math.floor((countdownTime / 1000 / 60) % 60);
      this.hours = Math.floor((countdownTime / (1000 * 60 * 60)) % 24);
      this.days = Math.floor(countdownTime / (1000 * 60 * 60 * 24));
      this.weeks = Math.floor(this.days / 7);
      this.months = Math.floor(this.days / 30.44);
      this.years = Math.floor(this.days / 365.25);

      setTimeout(this.calculateTime, 1000);
    },
    clearTime() {
      this.years = 0;
      this.months = 0;
      this.weeks = 0;
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    },
    start() {
      this.calculateTime();
      this.disabledInput = true;
      this.disableStart = true;
      this.disableReset = false;
      this.saveButtonStates();
    },
    restart() {
      localStorage.removeItem("birthdayDate");
      clearInterval(this.clearTime());
      this.dateInput = "";
      this.disabledInput = true;
      this.disableReset = true;
      this.disableStart = true;
      this.disableNew = false;
      this.saveButtonStates();
    },
    newBirthday() {
      this.disabledInput = false;
      this.disableNew = true;
      this.saveButtonStates();
    },
    saveButtonStates() {
      localStorage.setItem("disabledInput", this.disabledInput);
      localStorage.setItem("disableStart", this.disableStart);
      localStorage.setItem("disableReset", this.disableReset);
      localStorage.setItem("disableNew", this.disableNew);
    },
    loadButtonStates() {
      this.disabledInput = localStorage.getItem("disabledInput") === "true";
      this.disableStart = localStorage.getItem("disableStart") === "true";
      this.disableReset = localStorage.getItem("disableReset") === "true";
      this.disableNew = localStorage.getItem("disableNew") === "true";
    },
    showAction() {
      this.isAction = true
    },
    handleConfirm() {
      this.restart();
      this.isAction = false;
    },
  },
  mounted() {
    const savedDate = localStorage.getItem("birthdayDate");
    if (savedDate) {
      this.dateInput = savedDate;
      this.calculateTime();
    }
    this.loadButtonStates();
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.birthday-countdown
  @include display(flex, center, center)
  min-height: 100vh
  .app-container
    width: clamp(22.5rem, 14.6677rem + 34.8101vw, 36.25rem)
    padding: 0.8rem
    background: $col-white
    border-radius: 8px
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
    #dateInput
      font-size: $fs-small
      font-weight: $fw-medium
      width: 100%
      text-transform: uppercase
      padding: 0.3rem 0.5rem
      border-radius: 4px
      box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 40px -12px inset, rgba(0, 0, 0, 0.3) 0px 8px 26px -18px inset
    &--wrapper
      @include display(flex, center, center, 0.8rem, $flexwrap: true)
      margin-block: 1rem
      .time-box
        @include display(flex, center, center, $flexcolumn: true)
        font-size: $fs-smaller
        font-weight: $fw-medium
        color: rgba($col-black, 0.6)
        padding: 0.5rem 0.8rem
        border-radius: 4px
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 5px 2px
        &--number
          font-size: $fs-medium
          font-weight: $fw-medium
          color: $col-black
    &--buttons
      @include display(flex, center, center, 0.5rem)
      width: 100%
      .button
        padding: 0.3rem 0.8rem
        border-radius: 4px
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px
        &.start
          color: $col-white
          background: $col-success
        &.restart
          color: $col-white
          background: $col-danger
        &.new
          color: $col-white
          background: $col-primary
</style>
