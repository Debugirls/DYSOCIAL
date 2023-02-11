import { GetterTree } from "vuex";
import { IState } from "..";
import { IPublicationsState } from "./state";

const getters: GetterTree<IPublicationsState, IState> = {
  getPublications(state) {
    console.log(state.publications)
    return state.publications;
  },
  getSelectedPublication(state) {
    return state.selectedPublication;
  },
  getPublicationsPagination(state) {
    return state.publicationsFiltered;
  },
  getPublicationsLength(state){
    return state.publications.length;
  },
  getTotalPages(state){
    return state.totalPages;
  },
  getCurrentPage(state){
    return state.currentPage;
  },
  getTotalItems(state){
    return state.totalItems;
  }
};
export default getters;
