<template>
  <section class="quotes-generator">
    <HomeButton />
    <div class="app-container">
      <div class="quote">
        <p class="quote--text">{{ currentQuote.quote }}</p>
        <span class="quote--author">{{ currentQuote.author }}</span>
      </div>
      <button @click="generateQuote" class="btn-generate">
        Generate Quote
      </button>
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
      currentQuote: { quote: "Loading...", author: "" },
    };
  },
  mounted() {
    this.generateQuote();
  },
  methods: {
    generateQuote() {
      fetch("https://api.quotable.io/random")
        .then((response) => response.json())
        .then((data) => {
          this.currentQuote = { quote: data.content, author: data.author };
        })
        .catch((error) => {
          console.error("Error:", error);
          this.currentQuote = { quote: "Failed to load quote", author: "" };
        });
    },
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.quotes-generator
  @include display(flex, center, center)
  min-height: 100vh
  .app-container
    width: clamp(18.75rem, 7.7206rem + 49.0196vw, 31.25rem)
    .quote
      position: relative
      background: $col-white
      padding: 1rem
      border-radius: 8px
      overflow: hidden
      &::before, &::after
        content: ""
        position: absolute
        top: 0
        left: 0
        width: 10px
        height: 100%
        background: $col-primary
        z-index: 5
      &--text
        font-size: $fs-large
        font-style: italic
        font-weight: $fw-semibold
        margin-left: 1rem
        margin-bottom: 0.5rem
        &::before, &::after
          content: "“"
      &--author
        font-size: $fs-smaller
        font-weight: $fw-medium
        color: rgba($col-dark, 0.8)
        margin-left: 1rem
        &::before
         content: "- "
    .btn-generate
      display: block
      color: $col-white
      background: $col-primary
      margin: 1rem auto 0
      padding: 0.4rem 1.5rem
      border-radius: 2rem
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px
</style>
