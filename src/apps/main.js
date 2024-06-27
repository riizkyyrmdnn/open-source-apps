import { createApp } from 'vue';
import App from './App.vue';
import router from '../router/index';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { MdCategory, BiTrashFill, BiGithub, MdHomeRound, MdBackspaceRound, FaPlay, FaPause, MdRestartalt, IoCloseCircleOutline } from 'oh-vue-icons/icons';

addIcons(MdCategory, BiTrashFill, BiGithub, MdHomeRound, MdBackspaceRound, FaPlay, FaPause, MdRestartalt, IoCloseCircleOutline);

const app = createApp(App);
app.use(router);
app.component('v-icon', OhVueIcon);
app.mount('#app');
