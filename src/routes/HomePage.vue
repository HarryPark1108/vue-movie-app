<template>
    <HeadlineComp />
    <SearchComp />
    <MovieListComp />
</template>

<script>
import HeadlineComp from "../components/HeadlineComp.vue"
import SearchComp from "../components/SearchComp.vue"
import MovieListComp from "../components/MovieListComp.vue"

export default {
    components: {
        HeadlineComp,
        SearchComp,
        MovieListComp
    },
    created() {
        this.$store.commit("movie/resetMovies") // home page에 접속하면 resetMovies를 실행하여 초기화 한다.
    }
}
</script>
