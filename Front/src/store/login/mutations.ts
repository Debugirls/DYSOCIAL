import { User } from "@/models/user";
import { Token } from '@/models/token';
import { MutationTree } from 'vuex';
import { ILoginState } from './state';

const mutations: MutationTree<ILoginState> = {
    //Mutación para añadir el token recibido al state
    setToken(state: ILoginState, token: Token) {
        state.token = token;
    },
    //Mutación para añadir el usuario autorizado al state
    setUserLogin(state: ILoginState, authUser: User) {
        state.userLogin = authUser;
    },
    //Mutación que será true mientras se procesa la petición
    setIsLoading(state: ILoginState, value: boolean){
        state.userLoading = value;
    },
    //Mutación para eliminar el token recibido al state
    deleteToken(state: ILoginState) {
        state.token = null;
    },
}

export default mutations;