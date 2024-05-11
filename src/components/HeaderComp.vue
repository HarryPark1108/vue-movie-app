<template>
    <header>
        <LogoComp />
        <div class="nav nav-pills">
            <div 
                v-for="nav in navigations" 
                :key="nav.name" 
                class="nav-item">
                <RouterLink 
                    :to="nav.href" 
                    active-class="active"
                    :class="{ active: isMatch(nav.path) }"
                    class="nav-link"> <!-- bootstrap의 active 클래스를 사용하기 위해 active-class="active" 라고 지정 -->
                    {{ nav.name }}
                </RouterLink>
            </div>
        </div>
        <div
            class="user"
            @click="toAbout">
            <img :src="image" :alt="name">
        </div>
    </header>
</template>

<script>
import { mapState } from "vuex"
import LogoComp from "./LogoComp.vue"

export default {
    components: {
        LogoComp
    },
    data() {
        return {
            navigations: [
                {
                    name: "Search",
                    href: "/"
                },
                {
                    name: "Movie",
                    href: "/movie/tt4520988",
                    path: /^\/movie/   // "/movie"로 시작하는 경우
                },
                {
                    name: "About",
                    href: "/about"
                }
            ]
        }
    },
    computed: {
        ...mapState("about",[
            "image",
            "name"
        ])
        // image() {
        //     return this.$store.state.about.image
        // },
        // name() {
        //     return this.$store.state.about.name
        // }
    },
    methods: {
        isMatch(path) {
            if (!path) return false
            console.log(this.$route)
            return path.test(this.$route.fullPath)
        },
        toAbout() {
            this.$router.push("/about") // RouterLink 와 동일한 기능
        }
    } 
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
        margin-right: 40px;
    }
    .user {
        width: 40px;
        height: 40px;
        padding: 6px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: $gray-200;
        cursor: pointer;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 40px;
        margin: auto;
        transition: 0.4s;
        &:hover {
            background-color: darken($gray-200, 10%);
        }
        img {
            width: 100%;
        }
    }
    @include media-breakpoint-down(sm) {
        .nav {
            display: none;
        }
    }
}
</style>