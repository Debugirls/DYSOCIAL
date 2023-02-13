import { ActionTree } from "vuex";
import { ILoginState } from "./state";
import { IState } from "..";
import { Credentials } from "@/models/credentials";
import dysocialApi from "@/api/dysocialApi";
import { AxiosResponse } from "axios";
import router from "@/router";
import { User } from "@/models/user";

const actions: ActionTree<ILoginState, IState> = {
    //Objetivo: hacer una petición de tipo post para que el usuario a través de unas credenciales, la API te devuelva el token o no
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
   //Objetivo: obtener información del perfil del usuario ya autorizado
   async fetchUserLogin({commit}){
        commit('setIsLoading', true);
        //TODO actualizar endpoint cuando esté listo por backend--> user/profile
        const {data} = await dysocialApi.get<unknown, AxiosResponse<User>>('/user/profile');
        commit('setIsLoading', false);
        commit('setUserLogin', data);
},
    //usamos la mutación para actualizar el estado eliminando el token del localStorage y redirigir al login
    deleteToken ({commit}){
        commit('deleteToken');
        localStorage.removeItem('token');
        router.push({name: 'home'});
    }
}

export default actions;

