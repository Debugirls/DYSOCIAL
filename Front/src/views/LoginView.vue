<template>
    <div class="login-page">
        <div>
            <img class="logo" src="../assets/logo.png" alt="DySocial logo"/>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                    <div v-if="!registerActive" class="card login">
                    <h1>INICIAR SESIÓN</h1>
                    <form class="form-group form" @submit.prevent="getToken">
                        <input v-model="email" type="email" class="form-control" placeholder="Email" required>
                        <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required>
                        <input type="submit" class="btn btn-outline-primary">
                        <p>¿No tienes cuenta? <router-link class="link" to="#" @click="registerActive = !registerActive">ÚNETE</router-link>
                        </p>
                    </form>
                    </div>
                    <div v-else class="card register">
                    <h1>CREAR USUARIO</h1>
                    <form class="form-group" @submit.prevent="signNewUser">
                        <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                        <input v-model="usernameReg" type="text" class="form-control" placeholder="Nombre usuario" required>
                        <input v-model="passwordReg" type="password" class="form-control" placeholder="Contraseña" required>
                        <input type="submit" class="btn btn-outline-primary">
                        <p>¿Ya tienes cuenta? <router-link class="link" to="#" @click="registerActive = !registerActive">LOGIN</router-link>
                        </p>
                    </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { User } from '../models/user';
import dysocialApi from '../api/dysocialApi';
import { AxiosResponse } from 'axios';
import useUserLogin from "../composables/useUserLogin";
export default defineComponent({
  name: "NavBar",
  components: {
  },
  setup() {
    //Haremos la llamada a la Api con el fetchToken traido del composable al que le pasaremos los valores de email y contraseña con el evento submit del formulario
    const { fetchToken, fetchUserLogin } = useUserLogin();
    //Variables ractivas que se accede mediante .value
    let email = ref("");
    let password = ref("");
    const getToken = async () => {
      await fetchToken({email: email.value, password: password.value});
      if (localStorage.getItem('token')){
        fetchUserLogin()
    }
    }
    return{
      email,
      password,
      getToken
    }
  },
  methods: {
    async signNewUser() {
      const json = new FormData ();
      json.append('email', this.emailReg); 
      json.append('password', this.passwordReg);  
      json.append('username', this.usernameReg);
      try {
          await dysocialApi.post<unknown, AxiosResponse<User[]>>('/auth/signup', json);        
          console.log("Creado usuario");
          await this.getToken()     
      }
      catch (err) {
        console.log(err);
        alert('404 not found')
    } }
   },
  data() {
        return { 
      registerActive: false,
      usernameReg: "",
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      showError: false,
    }},
})

</script>
<style scoped>

p {
   line-height: 1rem;
   font-weight: 600;
}

h1 {
    color: var(--color-violet600);
    margin: 2rem, 0rem;
    font-size: xx-large;
    font-weight: 600;
    text-shadow: var(--color-green100) 1px 0 2px;
}

.card {
   padding: 1rem;
   margin-top: 1rem;
   border-color: var(--color-violet300);
   background-color: var(--color-violet200);
   box-shadow: var(--color-green100) 1px 2px;
}

.form-group input{
    margin-bottom: 1.25rem;
}

.login-page {
   align-items: center;
   display: flex;
   flex-direction: column;
}

.link{
    color: var(--color-violet600);
    font-weight: 800;
    text-shadow: var(--color-green100) 1px 0 2px;
}
.link:hover, link:active {
  color: var(--color-violet700)
}

.logo{
    max-width: 20rem;
    margin-top: 3rem;
}

.btn-outline-primary{
  color: var(--color-green100) !important;
  border-color: var(--color-violet700) !important;
  background-color: var(--color-violet600) !important;
  margin: 0rem 0.5rem;
  font-weight: 600;
}

.btn-outline-primary:hover, .btn-outline-primary:active {
  color: var(--color-violet500) !important;
  border-color: var(--color-violet500) !important;
  background-color: var(--color-green100) !important;
}

</style>