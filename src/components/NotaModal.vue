<template>
  <div v-if="isVisible" @click.self="closeModal" class="modal-overlay">
    <div class="modal-content">
      <span class="close-btn" @click="closeModal"><v-icon name="io-close-circle-outline" /></span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    name: "NotaModal",
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
        closeModal() {
          this.$emit("close");
        }
    },
}
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.modal-overlay
  position: fixed
  top: 0
  left: 0
  @include display(flex, center, center)
  width: 100%
  height: 100%
  background: rgba($col-black, 0.8)
  z-index: 100
  .modal-content
    position: relative
    width: clamp(18.75rem, 0.8929rem + 79.3651vw, 50rem)
    padding: 1rem
    background: white
    border-radius: 8px
  .close-btn
    position: absolute
    top: 10px
    right: 10px
    cursor: pointer
    font-size: 24px
</style>