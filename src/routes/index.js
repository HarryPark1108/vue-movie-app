import { createRouter, createWebHashHistory } from "vue-router"
import HomePage from "./HomePage.vue"
import MoviePage from "./MoviePage.vue"
import AboutPage from "./AboutPage.vue"
import NotFoundPage from "./NotFoundPage.vue"

export default createRouter({
    // Hash 형태로 아래와 같이 사용할 때
    // https://google.com/#/search
    history: createWebHashHistory(),

    scrollBehavior() {
        return {
            top: 0
        }
    },

    // pages
    routes: [
        {
            path: "/", // main page
            component: HomePage
        },
        {
            path: "/movie/:id", // movie page
            component: MoviePage
        },
        {
            path: "/about",
            component: AboutPage
        },
        {
            path: "/:notFound(.*)",
            component: NotFoundPage
        }
    ]
})