<template>
  <router-link class="card" :to="app.link" :title="app.title">
    <div class="img-icon">
      <img src="/logo.svg" alt="card icon" class="img-icon--logo">
    </div>
    <div class="card-body">
      <h5 class="title">{{ app.title }}</h5>
      <p class="category"><v-icon name="md-category" class="category--icon" /> {{ app.category }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    app: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.card
  text-align: left
  display: flex
  gap: 1rem
  width: 24rem
  padding: 10px
  background: $col-light
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
  border-radius: 8px
  transition: all 0.5s linear
  .img-icon
    @include display(inline-flex, center, center)
    width: 64px
    height: 64px
    padding: 0.8rem
    background: darken($col-light, 6)
    border-radius: 4px
    &--logo
      width: 100%
      height: 100%
  &-body
    color: $col-dark
    .title
      font-size: $fs-medium
    .category
      font-size: $fs-x-small
      font-weight: $fw-medium
      color: rgba($col-dark, 0.8)
      &--icon
        width: $fs-smaller
        height: $fs-smaller
</style>
