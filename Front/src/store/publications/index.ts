import { Module } from "vuex";
import { IState } from "..";
import { IPublicationsState } from "./state";
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const publicationsModule: Module<IPublicationsState, IState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default publicationsModule;