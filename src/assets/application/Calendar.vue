<template>
  <section class="container-calendar">
    <HomeButton />
    <div class="wrapper">
      <div v-for="(month, index) in months" :key="index" class="card">
        <h2 class="card--title">
          <span class="index">{{ index + 1 }}.</span> {{ monthNames[index] }}
        </h2>
        <table class="calendar">
          <thead>
            <tr>
              <th v-for="day in days" :key="day" class="calendar--day">
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody class="calendar-body">
            <tr v-for="(week, index) in month.weeks" :key="index">
              <td
                v-for="day in week"
                :key="day.date"
                :class="{ today: isToday(day, month.month) }"
              >
                {{ day.date }}
              </td>
            </tr>
          </tbody>
        </table>
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
      year: new Date().getFullYear(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      months: [],
    };
  },
  created() {
    this.generateCalendar();
  },
  methods: {
    generateCalendar() {
      for (let month = 0; month < 12; month++) {
        const firstDateMonth = new Date(this.year, month, 1);
        const lastDateMonth = new Date(this.year, month + 1, 0);
        const firstDayOfWeek = firstDateMonth.getDay();
        let date = new Date(firstDateMonth);
        let weeks = [];
        let week = new Array(7).fill({ date: "" });
        for (let i = 0; i < firstDayOfWeek; i++) {
          week[i] = { date: "" };
        }
        while (date <= lastDateMonth) {
          if (date.getDay() === 0) {
            weeks.push(week);
            week = new Array(7).fill({ date: "" });
          }
          week[date.getDay()] = { date: date.getDate() };
          date.setDate(date.getDate() + 1);
        }
        weeks.push(week);
        this.months.push({ month, weeks });
      }
    },
    isToday(day, month) {
      const today = new Date();
      return (
        day.date &&
        day.date === today.getDate() &&
        month === today.getMonth() &&
        this.year === today.getFullYear()
      );
    },
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.container-calendar
  @include display(flex, center, center)
  padding: 1rem
  .wrapper
    @include display(flex, center, center, 1rem, $flexwrap: true)
    text-align: center
    .card
      position: relative
      background: $col-white
      border-radius: 4px
      overflow: hidden
      cursor: default
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
      &--title
        color: $col-primary
        padding-block: 0.5rem
        .index
          position: absolute
          top: 5px
          left: 5px
          font-size: $fs-x-small
      .calendar
        width: 100%
        &--day
          color: $col-white
          background: $col-primary
          padding-inline: 0.5rem
  .today
    font-size: $fs-small
    font-weight: $fw-bolder
    color: $col-primary-subtle !important
    &::after
      content: ""
      position: absolute
      top: 7px
      right: 7px
      width: 5px
      height: 5px
      background: $col-primary-subtle !important
      border-radius: 50%
      z-index: 5
  table, thead, tbody
    border-collapse: collapse
    th
      font-weight: $fw-semibold
      text-align: center
      width: 50px
      padding-block: 0.5rem
    td
      position: relative
      font-weight: $fw-medium
      height: 50px
      &:first-child
        color: $col-danger
</style>
