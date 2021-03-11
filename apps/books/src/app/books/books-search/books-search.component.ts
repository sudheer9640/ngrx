import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Book } from '../models/book.model';
import { LoadBooks } from '../state/book.actions';
import { selectBookState } from '../state/book.selector';
import { BookState } from '../state/book.state';

@Component({
  selector: 'books-demo-app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  bookSearchString = <string>'';
  booksSubscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getPreviousSearchInfo();
  }

  getPreviousSearchInfo() {
    this.booksSubscription = this.store
      .select(selectBookState)
      .subscribe((state: BookState) => {
        if (state) {
          this.books = [...state.list];
          // console.log(this.books)
          this.bookSearchString = state.searchKey;
        }
      });
  }

  searchBooks(): void {
    if (!this.bookSearchString) {
      return;
    }
    this.bookSearchString = this.bookSearchString.trim();
    this.store.dispatch(LoadBooks({ key: this.bookSearchString }));
  }

  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
