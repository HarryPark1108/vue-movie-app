<template>
    <div class="about"> 
        <div class="photo">
            <LoaderComp 
                v-if="imageLoding"
                absolute />
            <img :src="image" :alt="name">
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div>{{ email }}</div>
        <div>{{ blog }}</div>
        <div>{{ phone }}</div>
    </div>
</template>

<script>
import { mapState } from "vuex"
import LoaderComp from '@/components/LoaderComp.vue'

export default {
    components: {
        LoaderComp
    },
    data() {
        return {
            imageLoding: true
        }
    },
    computed: {
        ...mapState("about", [ // "about" 모듈의 각 state를 가져옴 (vuex의 helper)
            "image",
            "name",
            "email",
            "blog",
            "phone"
        ])
        // 아래 코드를 위와 같이 간단하게 바꿀 수 있음
        // image() {
        //     return this.$store.state.about.image
        // },
        // name() {
        //     return this.$store.state.about.name
        // },
        // email() {
        //     return this.$store.state.about.email
        // },
        // blog() {
        //     return this.$store.state.about.blog
        // },
        // phone() {
        //     return this.$store.state.about.phone
        // }

    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            await this.$loadImage(this.image)
            this.imageLoding = false
        }
    },
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.about {
    text-align: center;
    .photo {
        width: 250px;
        height: 250px;
        margin: 40px auto 20px;
        padding: 30px;
        border: 10px solid $gray-300;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: $gray-200;
        position: relative;
        img {
            width: 100%
        }
    }
    .name {
        font-size: 40px;
        font-family: "Oswald" sans-serif;
        margin-bottom: 20px;
    }
}
</style>