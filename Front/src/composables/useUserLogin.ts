import { Credentials } from "@/models/credentials";
import { computed } from "vue";
import { useStore } from "vuex";
import { User } from "@/models/user";

const useUserLogin = () => {
    const store = useStore();
    return {
        //GETTERS: 
        token: computed(()=> store.getters['login/getToken']),
        userLogin: computed<User>(()=> store.getters['login/getUserLogin']),
        isLoading: computed(()=> store.getters['login/getIsLoading']),
        //ACTIONS: 
        fetchToken: (data: Credentials) => store.dispatch('login/fetchToken', data),
        fetchUserLogin: () => store.dispatch('login/fetchUserLogin'),
        deleteToken: () => store.dispatch('login/deleteToken'),
    }
};

export default useUserLogin;