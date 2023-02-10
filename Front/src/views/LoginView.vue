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
                        <input v-model="email" type="text" class="form-control" placeholder="Email" required>
                        <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required>
                        <input type="submit" class="btn btn-outline-primary">
                        <p>¿No tienes cuenta? <router-link class="link" to="#" @click="registerActive = !registerActive, showError = false">ÚNETE</router-link>
                        </p>
                    </form>
                    </div>

                    <div v-else class="card register">
                    <h1>CREAR USUARIO</h1>
                    <form class="form-group">
                        <input v-model="usernameReg" type="text" class="form-control" placeholder="Nombre usuario" required>
                        <input v-model="passwordReg" type="password" class="form-control" placeholder="Contraseña" required>
                        <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirmar Contraseña" required>
                        <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                        <input type="submit" class="btn btn-outline-primary" @click="doRegister">
                        <p>¿Ya tienes cuenta? <router-link class="link" to="#" @click="registerActive = !registerActive, showError = false">LOGIN</router-link>
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
//import ErrorAlert  from "@/ErrorAlert.vue"
import useUserLogin from "../composables/useUserLogin";
//components: { ErrorAlert },
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
      doRegister() {
         if (this.emailReg === "" || this.passwordReg === "" || this.confirmReg === "" || this.usernameReg === "") {
            this.showError = true;
         } else {
            console.log("registration done yei");
         }
      }
   },
  data() {
        return { 
      registerActive: false,
      usernameReg: "",
      emailLogin: "",
      passwordLogin: "",
      emailReg: "",
      passwordReg: "",
      confirmReg: "",
      showError: false,
    }},
})

//TODO: Añadir lógica
//const postsStore = usePosts()
    /*
    methods: {
      async submitUser() {
          this.showError = false
          //postsStore.updateEmail(this.email);
          try {
            const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
                email: this.email,
                password: this.password
            });
            if (response.status === 201) {
                console.log("yeei, login succesful");
                postsStore.updateAccessToken(response.data.access_token);
                postsStore.updateRefreshToken(response.data.refresh_token);
                this.$router.push({ name: 'products' });
            } else {
                console.log("oooh, login fail");
                this.showError = true;
            }
          } catch (error) {
            console.log("Error:", error);
            this.showError = true;
          }
        }
    },*/
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