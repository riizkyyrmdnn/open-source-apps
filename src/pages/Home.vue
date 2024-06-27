<template>
  <section class="home">
    <img src="/logo-text.svg" alt="main logo" class="main-logo" />
    <main>
      <Card v-for="app in Apps" :key="app.id" :app="app" />
    </main>
    <button class="button-github" @click="goToGithub">
      <v-icon name="bi-github" class="github-icon" />
    </button>
  </section>
</template>

<script>
import Card from "@component/Card.vue";
import { Apps } from "@asset/data/AppData";
export default {
  components: {
    Card,
  },
  data() {
    return {
      Apps,
    };
  },
  methods: {
    goToGithub() {
      window.open("https://github.com/riizkyyrmdnn", "_blank");
    },
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.main-logo
  display: block
  width: 150px
  margin: 1rem auto
  filter: drop-shadow(2px 2px 6px rgba($col-primary-subtle, 0.3))
main
  @include display(flex, center, flex-start, 1rem, $flexwrap: true)
.button-github
  position: fixed
  right: 5%
  bottom: 5%
  @include display(flex, center, center)
  width: 48px
  height: 48px
  background: transparent
  border-radius: 50%
  transition: all 0.3s
  .github-icon
    @include display(flex, center, center)
    width: 100%
    height: 100%
    padding: 0.5rem
    background: $col-white
    backdrop-filter: blur(0px)
    border-radius: 50%
    transition: all .3s
    border: 1px solid rgba(156, 156, 156, 0.466)
</style>
