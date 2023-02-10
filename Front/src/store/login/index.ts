import { Module } from "vuex";
import { IState } from "..";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state, { ILoginState } from "./state";


const loginModule: Module<ILoginState, IState> = {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};

export default loginModule;