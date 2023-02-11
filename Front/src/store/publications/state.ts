import { Publication } from './../../models/publications';

export interface IPublicationsState {
  publications: Publication[];
  selectedPublication: Publication | null;
  publicationsFiltered: Publication[];
  totalItems:   number,
  totalPages:   number,
  currentPage:  number,
  totalKarma: number;
}

function state(): IPublicationsState {
  return {
    publications: [],
    selectedPublication: null,
    publicationsFiltered: [],
    totalItems:   0,
    totalPages:   0,
    currentPage:  0,
    totalKarma: 0,
  };
}
export default state;
