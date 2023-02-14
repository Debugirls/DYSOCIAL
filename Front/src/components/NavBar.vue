<template>
  <div v-if="isAuthenticated">
    <nav class="navbar justify-content-space-between navbar-dark fixed-top" style="background-color: var(--color-violet500)">
      <div class="search-container">
        <a  href="https://github.com/Debugirls" class="navbar-brand">
          <img class="d-inline-block align-top logo-sm" src="../assets/logo-eye.png" alt="DySocial logo"/>
        </a>        
        <FilterBar/>  
      </div>
      <div class="group-buttons">
        <!--Home-->
        <RouterLink to="/" class="btn btn-outline-primary rounded-circle" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
        </svg>
      </RouterLink>
      <!--Add publication-->
      <RouterLink to="/newpublication" class="btn btn-outline-primary rounded-circle" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"></path>
        </svg>
      </RouterLink>
      <!--User profile-->
      <RouterLink to="/user" class="btn btn-outline-primary rounded-circle" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
      </RouterLink>
      <RouterLink to="/login" @click="logout" class="btn btn-outline-primary" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
          <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
        </svg>
      </RouterLink>
      </div>
    </nav>
  </div>
  <div v-else>
    <nav class="navbar justify-content-space-between navbar-dark fixed-top" style="background-color: var(--color-violet500)">
      <div class="search-container">
        <a  href="https://github.com/Debugirls" class="navbar-brand">
          <img class="d-inline-block align-top logo" src="../assets/logoLight.png" alt="DySocial logo"/>
        </a>      
      </div>
      <div class="group-buttons">
        <!--Home-->
        <RouterLink to="/" class="btn btn-outline-primary rounded-circle" type="button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
          </svg>
        </RouterLink>
        <RouterLink to="/login" class="btn btn-outline-primary" type="button">
          LOGIN
        </RouterLink>
      </div>
    </nav>
  </div>
  </template>
  
<script lang="ts">
import useUserLogin from "../composables/useUserLogin";
import { defineComponent} from 'vue';
import FilterBar from "./FilterBar.vue";

export default defineComponent({
  name: "NavBar",
  data(){
    return {
      isAuthenticated: false
    }
  },
  watch: {
    $route(){
      this.isAuthenticated = localStorage.token !== undefined && localStorage.token !== null
    }
  },
  components: {
    FilterBar
  },
  setup() {
    const { deleteToken, userLogin } = useUserLogin();
    const logout = () => {
        deleteToken();
    }   
    return { logout };
  },
})
</script>

<style scoped>
.search-container{
  display: flex;
  flex-direction: row;
  align-self: center;
}
.logo{
  max-width: 10rem;
  align-self: center;
  margin-top: 7%;
  margin-left: 5%;
  margin-right: 2%;
}
.logo-sm {
  max-height: 3rem;
  align-self: center;
  margin-top: 7%;
  margin-left: 15%;
  margin-right: 2%;
}
.group-buttons{
  margin-right: 0.3%;
  justify-content: flex-end;
  margin-right: 0.3%;
  justify-content: flex-end;
}
.btn-outline-primary{
  color: var(--color-green100) !important;
  border-color: var(--color-violet700) !important;
  background-color: var(--color-violet600) !important;
  margin: 0rem 0.5rem;
  font-weight: 600;
  margin: 0rem 0.5rem;
  font-weight: 600;
}
.btn-outline-primary:hover, .btn-outline-primary:active {
  color: var(--color-violet500) !important;
  border-color: var(--color-violet500) !important;
  background-color: var(--color-green100) !important;
}
</style>
