<template>
  <button v-if="!isHomePage" @click="showAction()" class="btn-home"><v-icon name="md-home-round" class="btn-home--icon" /></button>
  <ActionModal
      :showAction="isAction"
      @confirm="handleConfirm"
      @close="isAction = false"
    />
</template>

<script>
import ActionModal from "@component/ActionModal.vue";
export default {
  components: {
    ActionModal,
  },
  data() {
    return {
      isAction: false,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.name === 'Home';
    },
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    },
    showAction() {
      this.isAction = true;
    },
    handleConfirm() {
      this.goHome();
      this.isAction = false;
    },
  },
};
</script>

<style scoped lang="sass">
.btn-home
  position: fixed
  top: 3%
  left: 2%
  width: 32px
  height: 32px
  padding: 0.3rem
  border-radius: 50%
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px
  z-index: 90
  &--icon
    width: 100%
    height: 100%
</style>