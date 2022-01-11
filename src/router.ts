// import MainPage from "./components/MainPage.vue";
// import AnalysisPage from "./components/AnalysisPage.vue";
// import LoginPage from "./components/LoginPage.vue";
// import SignupPage from "./components/SignupPage.vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    { path: "/", component: () => import("./components/MainPage.vue") },
    { path: "/analysis/:queryId?", component: () => import("./components/AnalysisPage.vue") },
    { path: "/login", component: () => import("./components/LoginPage.vue") },
    { path: "/signup", component: () => import("./components/SignupPage.vue") },
];


const router = createRouter({
    history: createWebHistory("/site/"),
    routes: routes,
});

export default router;