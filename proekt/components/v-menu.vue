<template>
  <div class="v-menu">
  <h1 class="v-menu-title">Мы поможем вам подобрать носки и значки на любой вкус и цвет</h1>
  <div class="v-menu-links">
    <router-link to="/kids" class="v-menu-links-link" tag="div">
      <img src="img/kids/kids2.jpg" alt="" width="200">
      <h3>Детские носки</h3>
    </router-link>
    <router-link to="/men" class="v-menu-links-link" tag="div">
      <img src="img/men/men1.jpg" alt="">
      <h3>Мужские носки</h3>
    </router-link>
    <router-link to="/women" class="v-menu-links-link" tag="div">
      <img src="img/women/women11.jpg" alt="">
      <h3>Женские носки</h3>
    </router-link>
    <router-link to="/super" class="v-menu-links-link" tag="div">
      <img src="img/super/super5.jpg" alt="">
      <h3>Классные носки</h3>
    </router-link>
    <router-link to="/badges" class="v-menu-links-link" tag="div">
      <img src="img/badges/badges11.jpg" alt="">
      <h3>Значки</h3>
    </router-link>
  </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'main-menu',
    data() {
      return {
    
      }
    },
    methods: {
     ...mapActions([
        'GET_PRODUCTS',
      ]),
    },
    computed: {
      ...mapGetters([
        'ISPRODUCT'
      ])
    },
    mounted() {
      if (!this.ISPRODUCT) {
      this.GET_PRODUCTS()
    }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');

.v-menu {
  background-color: white;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: grid;

    &-title {
        align-self: center;
        justify-self: center;
        color: black;
        font-size: 45px;
        width: 50%;
        text-align: center;
    }

    &-links {
      display: grid;
      align-items: flex-start;
      grid-template-columns: repeat(5, 1fr);
      width: 90%;
      margin: 0 auto;
      grid-gap: 15px;

      &-link {
        font-family: 'Comfortaa', cursive;
        background-color: rgb(197, 221, 199);
        border: 1px solid black;
        display: grid;

        img {
          height: 300px;
          width: 100%;
        }

        h3 {
          justify-self: center;
          font-size: 28px;
        }
      }
    }
}
</style>