<template>
  <section class="to-do-list">
    <HomeButton />
    <button @click="showInputModal = true" class="btn-add-todo">+</button>
    <div class="todo-container">
      <ul class="todo-list">
        <li v-for="(todo, index) in todos" :key="index" :class="{ completed: todo.itemComplete }" id="task">
          <label :style="{ textDecoration: todo.itemComplete ? 'line-through' : 'none' }">
            <input v-model="todo.itemComplete" type="checkbox" name="todo_title" :id="`todo_title_${index}`" />
            {{ todo.itemName }}
          </label>
          <button @click="showAction(index)" class="btn-remove"><v-icon name="bi-trash-fill" class="todo-trash" /></button>
        </li>
      </ul>
    </div>
    <ActionModal
      :showAction="isAction"
      @confirm="handleConfirm"
      @close="isAction = false"
    />
    <Modal :isVisible="showInputModal" @close="showInputModal = false">
      <h3>New Task</h3>
      <form @submit.prevent="addTodo" autocomplete="off" spellcheck="false" class="new-todo">
          <label for="todoTitle">Title</label>
          <input v-model="newTodo" type="text" name="todoTitle" id="todoTitle" />
        <button type="submit">Add</button>
      </form>
    </Modal>
  </section>
</template>

<script>
import Modal from "@component/NotaModal.vue";
import ActionModal from "@component/ActionModal.vue";
import HomeButton from "@component/HomeButton.vue";
export default {
  components: {
    Modal,
    ActionModal,
    HomeButton,
  },
  data() {
    return {
      newTodo: "",
      todos: [],
      showInputModal: false,
      isAction: false,
      currentNoteIndex: null,
    };
  },
  methods: {
    addTodo() {
      let item = {
        itemName: this.newTodo,
        itemComplete: false,
      };
      this.todos.push(item);
      this.newTodo = "";
      this.showInputModal = false;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    showAction(index) {
      this.currentNoteIndex = index;
      this.isAction = true;
    },
    handleConfirm() {
      this.removeTodo(this.currentNoteIndex);
      this.isAction = false;
      this.currentNoteIndex = null;
    },
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.to-do-list
  @include display(flex, center, center)
  .todo-container
    width: clamp(18.75rem, 2.2059rem + 73.5294vw, 37.5rem)
    min-height: 100vh
    padding: 1rem
    background: $col-white
    .todo-list
      list-style-type: none
      &:not(&:last-of-type)
        border-bottom: 1px solid $col-dark
      #task
        @include display(inline-flex, space-between, center)
        margin-block: 0.3rem
        padding: 0.5rem 1rem
        width: 100%
        background: $col-gray
        border-radius: 8px
        .itemComplete
          background: $col-success !important
      label
        font-weight: $fw-medium
        width: 100%
        input
          margin-right: 1rem
      .btn-remove
        @include display(inline-flex, center, center)
        width: 32px
        height: 32px
        background: $col-danger
        border-radius: 8px
        .todo-trash
          color: $col-white
  .new-todo
    label
      display: block
    input
      width: 100%
      padding: 0.3rem
    button
      color: $col-white
      margin-top: 1rem
      padding: 0.3rem 3rem
      background: $col-primary
      border-radius: 2rem
  .btn-add-todo
    position: fixed
    right: 5%
    bottom: 5%
    font-size: $fs-large
    width: 50px
    height: 50px
    color: $col-white
    background: $col-primary
    border-radius: 50%
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px
    z-index: 9
</style>