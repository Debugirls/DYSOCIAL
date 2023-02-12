import { Publication } from './../../models/publications';
import { MutationTree } from "vuex";
import { IPublicationsState } from "./state";

const mutations: MutationTree<IPublicationsState> = {
  //Mutación para añadir las publicaciones recibidas por parámetro al state
  setPublications(state: IPublicationsState, publications: Publication[]) {
    state.publications = publications;
  },
  //Mutación para añadir la publicación recibida por parámetro al state
  setSelectedPublication(state: IPublicationsState, publication: Publication) {
    state.selectedPublication = publication;
  },
  //Mutación para añadir las publicaciones recibidas por parámetro al state
  setPublicationsFiltered(state: IPublicationsState, publicationsFiltered: Publication[]) {
    state.publicationsFiltered = publicationsFiltered;
  },

  setTotalPages(state: IPublicationsState, totalPages: number) {
    state.totalPages = totalPages;
  },

  setCurrentPage(state: IPublicationsState, currentPage: number) {
    state.currentPage = currentPage;
  },
  setTotalItems(state: IPublicationsState, totalItems: number) {
    state.totalItems = totalItems;
  },
};

export default mutations;
