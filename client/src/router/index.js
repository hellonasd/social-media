import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import home from "@/views/home";
import login from "@/views/login";
import registration from "@/views/registration";
import profile from "@/views/profile";
import messenger from "@/views/messenger";

const routes = [
  { path: "/", meta: { auth: true }, component: home },
  { path: "/login", component: login },
  { path: "/registration", component: registration },
  { path: "/profile/:username", component: profile },
  { path: "/messenger", component: messenger}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


export default router;
