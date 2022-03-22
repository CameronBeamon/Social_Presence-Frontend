import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ViewPost from "../views/ViewPost.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import AuthTwitter from "../views/AuthTwitter.vue";
import AuthReddit from "../views/AuthReddit.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/view_post/:id",
    name: "ViewPost",
    component: ViewPost,
  },
  {
    path: "/sign_up",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/auth_twitter",
    name: "AuthTwitter",
    component: AuthTwitter,
  },
  {
    path: "/auth_reddit",
    name: "AuthReddit",
    component: AuthReddit,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
