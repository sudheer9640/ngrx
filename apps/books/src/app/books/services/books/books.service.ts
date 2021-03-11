import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http/http.service';
import { apiEndPoints } from '../../../constants/constants';

@Injectable()
export class BooksService {
  constructor(private httpService: HttpService) {}

  getBooks(category: string) {
    return this.httpService.get(apiEndPoints.BOOKS_QUERY + category);
  }

  getBook(id: string) {
    return this.httpService.get(apiEndPoints.BOOK_DETAILS + id);
  }
}
