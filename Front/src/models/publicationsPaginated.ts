import { Publication } from "./publications";

export interface PaginatedResponse {
    totalItems:   number,
    totalPages:   number,
    currentPage:  number,
    comments: Publication[]     
}