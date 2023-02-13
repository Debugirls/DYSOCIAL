<template>
  <div>
    <NavBar/>
    <router-view :key="$route.fullPath"/>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import  NavBar  from "./components/NavBar.vue";
import useUserLogin from './composables/useUserLogin';

export default defineComponent({
  name: 'AppComponent',
  components: {
    NavBar,
  },
  setup(){
    if (localStorage.getItem('token')){
      const {fetchUserLogin} = useUserLogin()
      fetchUserLogin()
    }
  }
})
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
}

nav a.router-link-exact-active {
  text-decoration: none;
  color: var(--color-green100)
}
</style>
