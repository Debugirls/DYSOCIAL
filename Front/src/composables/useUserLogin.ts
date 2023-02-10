//Composable para el Login - autentificación
import { Credentials } from "@/models/credentials";
import { computed } from "vue";
import { useStore } from "vuex";
import { User } from "@/models/user";

const useUserLogin = () => {
    const store = useStore(); //me facilita acceder a las variables state
    return {
        //GETTERS: para poder acceder al valor de las variables, devuelve el valor del state en cada uno de los getters.
        token: computed(()=> store.getters['login/getToken']),
        userLogin: computed<User>(()=> store.getters['login/getUserLogin']),
        isLoading: computed(()=> store.getters['login/getIsLoading']),
        
        //ACTIONS: nos permite hacer llamadas asíncronas, y volcar la respuesta de data en la variable state
        fetchToken: (data: Credentials) => store.dispatch('login/fetchToken', data),
        fetchUserLogin: () => store.dispatch('login/fetchUserLogin'),
        deleteToken: () => store.dispatch('login/deleteToken'),
    }
};

export default useUserLogin;