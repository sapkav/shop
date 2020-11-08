<template>
  <div class="v-menu" style="background-image: url(img/header-menu.jpg)">
  <h1 class="v-menu-title">Мы поможем вам подобрать носки на любой вкус и цвет</h1>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.v-menu {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
     display: grid;

    &-title {
        align-self: center;
        justify-self: center;
        color: white;
        font-size: 35px;
        width: 50%;
        text-align: center;
    }
}
</style>