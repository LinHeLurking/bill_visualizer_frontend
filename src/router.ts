import MainPage from "./components/MainPage.vue";
import AnalysisPage from "./components/AnalysisPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", component: MainPage },
    { path: "/analysis/:queryId?", component: AnalysisPage },
];


const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;