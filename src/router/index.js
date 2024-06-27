import { createRouter, createWebHistory } from "vue-router";
import { Apps } from "@asset/data/AppData";
import Home from "@page/Home.vue";
import NotaDetail from "@component/NotaDetail.vue";

const routes = [
  {
    path: "/open-source-apps/",
    name: "Home",
    component: Home,
  },
  ...Apps.map(app => ({
    path: app.link,
    name: app.title.replace(/\s+/g, ''),
    component: app.component,
  })),
  {
    path: "/note-app/:index",
    name: "NotaDetail",
    component: NotaDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
