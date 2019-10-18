<template>
    <div>
        This is a demo.
        <a>HaHa</a>
    </div>
</template>

<script>
    import Mixin from './mixin';

    export default {
        name: "App.uve",
        mixins: [ Mixin ]
    }
</script>

<!--<style scoped>-->
<!--div {-->
<!--    margin: 0;-->
<!--}-->
<!--</style>-->

<style scoped lang="less">
div {
    margin: 0;
    a {
        color: cornflowerblue;
    }
}
</style>
