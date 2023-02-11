import { computed } from "vue";
import { useStore } from "vuex";
import { Pagination } from "@/models/pagination";

const usePublications = () => {
  const store = useStore();

  return {
    // GETTERS
    publications: computed(() => store.getters["publications/getPublications"]),
    publicationsFiltered: computed(()=> store.getters["publications/getPublicationsPagination"]),
    publication: computed(()=> store.getters["publications/getSelectedPublication"]),
    publicationsLength: computed(()=> store.getters['publications/getPublicationsLength']),
    totalPages: computed(()=> store.getters['publications/getTotalPages']),
    currentPage: computed(()=> store.getters['publications/getCurrentPage']),
    totalItems: computed(()=> store.getters['publications/getTotalItems']),

    // ACTIONS
    fetchPublications: () => store.dispatch("publications/fetchPublications"),
    fetchPublicationByTitle: (publicationTitle: string) => store.dispatch('publications/fetchPublicationByTitle', publicationTitle),
    fetchPublicationByPagination: (pagination: Pagination) => store.dispatch('publications/fetchPublicationByPagination', pagination),
  };
};

export default usePublications;