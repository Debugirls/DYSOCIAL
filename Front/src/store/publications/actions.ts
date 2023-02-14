import { AxiosResponse } from 'axios';
import dysocialApi from '@/api/dysocialApi';
import { ActionTree } from "vuex";
import { IPublicationsState } from "./state";
import { IState } from "..";
import { Pagination } from "@/models/pagination";
import { PaginatedResponse } from '@/models/publicationsPaginated';

const actions: ActionTree<IPublicationsState, IState> = {
  //Action que hace la llamada a la API para acceder a todas las publicaciones.
  async fetchPublications({commit}) {
    const {data} = await dysocialApi.get<unknown, AxiosResponse<PaginatedResponse>>('/publications');
    commit('setPublications', data.comments);
    commit('setCurrentPage', data.currentPage);
    commit('setTotalItems', data.totalItems);
    commit('setTotalPages', data.totalPages);
  },
  //Action que hace la llamada a la API para acceder a todas las publicaciones según la búsqueda.
  async fetchSearchPublications({commit}) {
    const { data } = await dysocialApi.get<unknown, AxiosResponse<PaginatedResponse>>(`/publications/ + search`);
    commit(`setsearchedPublications`, data.comments);
  },
  //Action que hace la llamada a la API para acceder a todas las publicaciones que tengan la palabra específica en su título.
  async fetchPublicationByTitle({commit}, publicationTitle: string) {
    const {data} = await dysocialApi.get<unknown, AxiosResponse<PaginatedResponse>>(`/publications/?title=${publicationTitle}`);
    commit('setPublicationsFiltered', data.comments);
  },

  //Action que hace la llamada a la API para acceder a todas las publicaciones según offset y limit.
  async fetchPublicationByPagination({commit}, pagination: Pagination) {
      let searchQuery = `/publications?page=${pagination.offset}&size=${pagination.limit}`
      if(pagination.title && pagination.title.length > 0) {
        searchQuery = searchQuery + `&title=${pagination.title}`
      }
      if(pagination.author && pagination.author.length > 0) {
        searchQuery = searchQuery + `&author=${pagination.author}`
      }
      const {data} = await dysocialApi.get<unknown, AxiosResponse<PaginatedResponse>>(searchQuery);
      console.log({data})
      commit('setPublicationsFiltered', data.comments);
      commit('setCurrentPage', data.currentPage);
      commit('setTotalItems', data.totalItems);
      commit('setTotalPages', data.totalPages);
  },

  setCurrentPage({commit}, page: number) {
    commit('setCurrentPage', page);
  }
}

export default actions;