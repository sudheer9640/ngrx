import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BooksService } from '../services/books/books.service';
import { GetBook, GetBookSuccess, LoadBooks, LoadBooksSuccess } from './book.actions';
import { Book } from '../models/book.model';
import { BooksResponseModel } from '../models/books.response.model';

@Injectable()
export class BookEffects {
  constructor(private actions$: Actions, private booksService: BooksService) {
  }

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadBooks),
      mergeMap((action) =>
        this.booksService.getBooks(action.key).pipe(
          map(
            (booksList: BooksResponseModel)=>
              LoadBooksSuccess({
                books: booksList.items.map(({ id, volumeInfo }) => ({
                  id,
                  volumeInfo,
                  buying: false
                })),
                key: action.key
              }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  getBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBook),
      mergeMap((action) =>
        this.booksService.getBook(action.key).pipe(
          map((book: Book) => {
            const { id, volumeInfo } = book;
            return GetBookSuccess({ book: { id, volumeInfo, buying: false } });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
