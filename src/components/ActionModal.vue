<template>
  <div v-if="showAction" class="action-overlay">
    <div class="action-modal">
      <h3 class="modal-title">Are you sure?</h3>
      <button @click="confirm" class="btn-confirm">Yes</button>
      <button @click="close" class="btn-reject">No</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showAction: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm");
      this.close();
    },
    close() {
      this.$emit("close");
    }
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.action-overlay
  position: absolute
  top: 0
  left: 0
  @include display(flex, center, center)
  width: 100%
  height: 100%
  background: rgba($col-black, 0.8)
  z-index: 99
  .action-modal
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    text-align: center
    padding: 1rem
    background: white
    border-radius: 4px
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
    .modal-title
      font-size: $fs-larger
    %btn-modal
      padding: 0.2rem 2rem
    .btn-confirm
      @extend %btn-modal
      color: $col-danger
      background: transparent
    .btn-reject
      @extend %btn-modal
      background: $col-success
      border-radius: 2rem
</style>
