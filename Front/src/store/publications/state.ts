import { Publication } from './../../models/publications';

export interface IPublicationsState {
  publications: Publication[];
  selectedPublication: Publication | null;
  publicationsFiltered: Publication[];
}

function state(): IPublicationsState {
  return {
    publications: [],
    selectedPublication: null,
    publicationsFiltered: [],
  };
}
export default state;
