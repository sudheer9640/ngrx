import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { BooksService } from '../services/books.service';
import { LoadBooks, LoadBooksSuccess, GetBook, GetBookSuccess } from './book.actions';

@Injectable()
export class BookEffects {

  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {
  }

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadBooks),
      mergeMap((action: any) =>
        this.booksService.getBooks(action.key).pipe(
          map((booksList: any) => LoadBooksSuccess(
            {
              books: booksList.items.map(({ id, volumeInfo }) => ({ id, volumeInfo, buying: false })),
              key: action.key
            })),
          catchError(err => EMPTY))
      )
    ));


  getBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetBook),
      mergeMap((action: any) =>
        this.booksService.getBook(action.key).pipe(
          map((book) => {
            const { id, volumeInfo } = book;
            return GetBookSuccess({ book: { id, volumeInfo, buying: false } });
          }),
          catchError(err => EMPTY)
        )
      )
    ));
}
