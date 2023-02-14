import { ActionTree } from "vuex";
import { ILoginState } from "./state";
import { IState } from "..";
import { Credentials } from "@/models/credentials";
import dysocialApi from "@/api/dysocialApi";
import { AxiosResponse } from "axios";
import router from "@/router";
import { User } from "@/models/user";

const actions: ActionTree<ILoginState, IState> = {
    //Petición de tipo post para que la API te devuelva el token o no, según las credenciales del usuario
   async fetchToken({ commit }, body: Credentials){
    //Obtiene la data
        try {
            const { data } = await dysocialApi.post("/auth/signin", body);
            commit("setToken", data);
             //Usamos la mutación setToken para modificar el state del token que recibimos y lo guardamos. 
            localStorage.setItem('token', data.accessToken);
            router.push({name: 'home'});
    }   catch(error: any){
            console.error(error.message)
            alert('Status 401: No tienes permisos de acceso')
    }
   },
   //Obtener información del perfil del usuario ya autorizado
   async fetchUserLogin({commit}){
        commit('setIsLoading', true);
        const {data} = await dysocialApi.get<unknown, AxiosResponse<User>>('/user/profile');
        commit('setIsLoading', false);
        commit('setUserLogin', data);
},
    //Usamos la mutación para actualizar el estado eliminando el token del localStorage y redirigir al login
    deleteToken ({commit}){
        commit('deleteToken');
        localStorage.removeItem('token');
        router.push({name: 'home'});
    }
}

export default actions;

