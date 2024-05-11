<template>
    <footer>
        <LogoComp />
        <a 
            href="https://github.com/harrypark1108" 
            target="_blank">
            (c){{ new Date().getFullYear() }} HEROPY
        </a>
    </footer>
</template>

<script>
import LogoComp from "./LogoComp.vue"
export default {
    components: {
        LogoComp
    }
}
</script>

<style lang="scss" scoped>
footer {
    padding: 70px 0;
    text-align: center;
    opacity: 0.3;
    .logo {
        display: block;
        margin-bottom: 4px;
    }
}
</style>