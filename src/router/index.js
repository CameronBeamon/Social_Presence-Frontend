import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NewPost from "../views/NewPost.vue";
import ViewPost from "../views/ViewPost.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/new_post",
    name: "NewPost",
    component: NewPost,
  },
  {
    path: "/view_post/:id",
    name: "ViewPost",
    component: ViewPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
