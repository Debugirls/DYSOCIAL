import { Publication } from "./publications";

export interface PaginatedResponse {
    totalItems:   number,
    totalPages:   number,
    currentPage:  number,
    //Debería cambiarse para items en vez de comments en el back
    comments: Publication[]     
}