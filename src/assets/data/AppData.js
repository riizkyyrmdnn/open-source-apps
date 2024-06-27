import DigitalClock from "@asset/application/DigitalClock.vue";
import BMICalculator from "@asset/application/BMICalculator.vue";
import Calculator from "@asset/application/Calculator.vue";
import Calendar from "@asset/application/Calendar.vue";
import NoteApp from "@asset/application/NoteApp.vue";
import QuotesGenerator from "@asset/application/QuotesGenerator.vue";
import Stopwatch from "@asset/application/Stopwatch.vue";
import ToDoList from "@asset/application/ToDoList.vue";
import BirthdayCountdown from "@asset/application/BirthdayCountdown.vue";

const categories = [
  "Health",
  "Education",
  "Organization",
  "Lifestyle",
  "Social",
];

export const Apps = [
  {
    id: 1,
    title: "BMI Calculator",
    category: categories[0],
    link: "/bmi-calculator",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: BMICalculator,
  },
  {
    id: 2,
    title: "Calculator",
    category: categories[1],
    link: "/calculator",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: Calculator,
  },
  {
    id: 3,
    title: "Calendar",
    category: categories[2],
    link: "/calendar",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: Calendar,
  },
  {
    id: 4,
    title: "Digital Clock",
    category: categories[3],
    link: "/digital-clock",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: DigitalClock,
  },
  {
    id: 5,
    title: "Note App",
    category: categories[2],
    link: "/note-app",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: NoteApp,
  },
  {
    id: 6,
    title: "Quotes Generator",
    category: categories[3],
    link: "/quotes-generator",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: QuotesGenerator,
  },
  {
    id: 7,
    title: "Stopwatch",
    category: categories[0],
    link: "/stopwatch",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: Stopwatch,
  },
  {
    id: 8,
    title: "To do List",
    category: categories[2],
    link: "/to-do-list",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: ToDoList,
  },
  {
    id: 9,
    title: "Birthday Countdown",
    category: categories[4],
    link: "/birthday-countdown",
    developer: "OSApps",
    date: "17 June 2024",
    version: {
      "1.0.0": [{ list: 1, feature: "Official Release" }],
    },
    component: BirthdayCountdown,
  },
];