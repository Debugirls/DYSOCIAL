import { GetterTree } from "vuex";
import { IState } from "../index";
import { ILoginState } from "./state";

const getters: GetterTree<ILoginState, IState> = {
    getToken(state) {
        return state.token;
    },
    getUserLogin(state) {
        return state.userLogin;
    },
    getIsLoading(state) {
        return state.userLoading;
    },
}

export default getters;