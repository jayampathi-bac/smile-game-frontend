import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "@/views/Register";
import Menu from "@/views/Menu.vue";
import PlayGame from "@/views/PlayGame.vue";
import NotFound from "@/views/NotFound";
import Unauthorized from "@/views/Unauthorized";
import Store from "../store";
import DifficultyMenu from "@/views/DifficultyMenu.vue";
import LeaderBoard from "@/views/LeaderBoard.vue";

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        name: "login",
        path: "/login",
        component: Login
    },
    {
        name: "register",
        path: "/register",
        component: Register
    },
    {
        name: "menu",
        path: "/menu",
        component: Menu
    },
    {
        name: "difficulty-menu",
        path: "/difficulty-menu",
        component: DifficultyMenu
    },
    {
        name: "leaderboard",
        path: "/leaderboard",
        component: LeaderBoard
    },
    {
        name: "play-game",
        path: "/play-game",
        component: PlayGame
    },
    {
        name: "404",
        path: "/404",
        component: NotFound
    },
    {
        name: "401",
        path: "/401",
        component: Unauthorized
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFound
    }

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const {roles} = to.meta;
    const currentUser = Store.getters["currentUser"];

    if (roles?.length) {
        if (!currentUser) {
            return next({path: "/login"});
        }

        if (!roles.includes(currentUser.role)) {
            return next({path: "/401"});
        }
    }

    next();
});

export default router;
