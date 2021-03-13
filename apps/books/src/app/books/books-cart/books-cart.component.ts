import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Book } from '../models/book.model';
import { selectCartItems } from '../state/book.selector';

@Component({
  selector: 'books-demo-app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BooksCartComponent implements OnInit {
  books: Book[] = [];
  bookSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.bookSubscription = this.store
      .select(selectCartItems)
      .subscribe((cItems) => (this.books = cItems));
  }
}
