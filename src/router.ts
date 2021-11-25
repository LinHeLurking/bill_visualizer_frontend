import MainPage from "./components/MainPage.vue";
import AnalysisPage from "./components/AnalysisPage.vue";
import LoginPage from "./components/LoginPage.vue";
import SignupPage from "./components/SignupPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", component: MainPage },
    { path: "/analysis/:queryId?", component: AnalysisPage },
    { path: "/login", component: LoginPage },
    { path: "/signup", component: SignupPage },
];


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;