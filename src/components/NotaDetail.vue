<template>
  <section class="nota-detail">
    <div class="header">
      <h3 class="header--label">Title</h3>
      <h1 class="header--title">{{ note.title }}</h1>
    </div>
    <div class="message">
      <h3 class="message--title">Message</h3>
      <div class="message-container">
        <p class="message-container--text">{{ note.message }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {
      note: { title: "", message: "" },
    };
  },
  created() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes && notes[this.index]) {
      this.note = notes[this.index];
    }
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.nota-detail
  padding: 1rem
  background: rgba($col-white, 0.9)
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
  .header
    &--label
      font-size: $fs-smaller
      color: rgba($col-dark, 0.6)
  .message
    &--title
      font-size: $fs-smaller
      color: rgba($col-dark, 0.6)
</style>