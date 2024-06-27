<template>
  <section class="note-app">
    <HomeButton />
    <div class="note-container">
      <button class="add-note" @click="showInputModal = true">+</button>
      <div v-for="(note, index) in notes" :key="index" @click="viewNoteDetail(index)" class="note-card">
        <span class="note-card--number">{{ index + 1 }}</span>
        <h4 class="note-card--title">{{ note.title }}</h4>
        <p class="note-card--text">{{ truncatedMessage(note.message) }}</p>
        <button @click.stop="editNoteModal(index)" class="note-card--edit">Edit</button>
        <button @click.stop="showAction(index)" class="note-card--remove">Remove</button>
      </div>
    </div>
    <Modal :isVisible="showInputModal" @close="showInputModal = false">
      <h3>New Note</h3>
      <form @submit.prevent="addNote" autocomplete="off" spellcheck="false" class="new-note">
        <div>
          <label for="noteTitle">Title</label>
          <input v-model="newNote.title" type="text" name="noteTitle" id="noteTitle" />
        </div>
        <div>
          <label for="message">Message</label>
          <textarea
            v-model="newNote.message"
            name="message"
            id="message"
          ></textarea>
        </div>
        <button type="submit">Add</button>
      </form>
    </Modal>
    <Modal
      v-if="editModal.isVisible"
      :isVisible="editModal.isVisible"
      @close="editModal.isVisible = false"
    >
      <h3>Edit Note</h3>
      <form @submit.prevent="saveEdit" autocomplete="off" spellcheck="false" class="new-note">
        <div>
          <label for="editTitle">Title:</label>
          <input
            v-model="editModal.note.title"
            type="text"
            name="editTitle"
            id="editTitle"
          />
        </div>
        <div>
          <label for="editMessage">Message:</label>
          <textarea
            v-model="editModal.note.message"
            name="editMessage"
            id="editMessage"
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    </Modal>
    <ActionModal
      :showAction="isAction"
      @confirm="handleConfirm"
      @close="isAction = false"
    />
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
      notes: [],
      newNote: { title: "", message: "" },
      showInputModal: false,
      editModal: { isVisible: false, note: null },
      isAction: false,
      currentNoteIndex: null,
    };
  },
  created() {
    this.notes = JSON.parse(localStorage.getItem("notes")) || [];
  },
  methods: {
    addNote() {
      this.notes.push({ ...this.newNote });
      localStorage.setItem("notes", JSON.stringify(this.notes));
      this.newNote = { title: "", message: "" };
      this.showInputModal = false;
    },
    editNoteModal(index) {
      this.editModal.isVisible = true;
      this.editModal.note = { ...this.notes[index] };
      this.currentNoteIndex = index;
    },
    saveEdit() {
      this.notes.splice(this.currentNoteIndex, 1, this.editModal.note);
      localStorage.setItem("notes", JSON.stringify(this.notes));
      this.editModal.isVisible = false;
      this.currentNoteIndex = null;
    },
    removeNote(index) {
      this.notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(this.notes));
    },
    viewNoteDetail(index) {
      this.$router.push({ name: "NotaDetail", params: { index: index } });
    },
    showAction(index) {
      this.currentNoteIndex = index;
      this.isAction = true;
    },
    handleConfirm() {
      this.removeNote(this.currentNoteIndex);
      this.isAction = false;
      this.currentNoteIndex = null;
    },
    truncatedMessage(message) {
      const words = message.split(" ");
      const maxWords = 15;
      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
      }
      return message;
    },
  },
};
</script>

<style scoped lang="sass">
@import "@style/main.sass"
.note-app
  padding: 0.5rem
  .note-container
    @include display(flex, flex-start, center, 0.5rem, $flexwrap: true)
    height: auto
    padding: 0.8rem
    background: rgba($col-white, 0.9)
    border-radius: 8px
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px
    .add-note
      position: fixed
      right: 5%
      bottom: 5%
      font-size: $fs-large
      width: 50px
      height: 50px
      color: $col-white
      background: $col-secondary
      border-radius: 50%
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px
      z-index: 9
    .note-card
      position: relative
      width: 191.7px
      height: 191.7px
      padding: 0.5rem
      background: $col-light
      border-radius: 4px
      cursor: pointer
      &--number
        position: absolute
        top: 5px
        right: 10px
        font-size: $fs-xx-small
      &--title
        font-size: $fs-small
        text-transform: capitalize
      &--text
        font-size: $fs-x-small
      &--edit, &--remove
        margin: 0.6rem 0.2rem 0
        padding: 0.2rem 1rem
        background: $col-warning
        border-radius: 2rem
        &:last-child
          color: $col-white
          background: $col-danger
  .new-note
    label
      display: block
    input
      width: 100%
      padding: 0.3rem
    textarea
      width: 100%
      height: 400px
      padding: 0.3rem
    button
      color: $col-white
      padding: 0.3rem 3rem
      background: $col-primary
      border-radius: 2rem
</style>
