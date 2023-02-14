import { User } from '@/models/user';
import { createStore } from 'vuex';
import loginModule from './login';
import publicationsModule from'./publications';

export interface IState {
  authUser: User | null; 
}

export default createStore<IState>({
  state: {
    authUser: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    publications: publicationsModule,
    login: loginModule,
  }
})