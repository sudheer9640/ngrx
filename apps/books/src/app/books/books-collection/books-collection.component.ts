import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../models/book.model';
import { selectBookState } from '../state/book.selector';
import { BillingDetails } from '../models/billing-details.model';
import { BookState } from '../state/book.state';

@Component({
  selector: 'books-demo-app-books-collection',
  templateUrl: './books-collection.component.html',
  styleUrls: ['./books-collection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BooksCollectionComponent implements OnInit {
  books: Book[] = [];
  billingDetails = <BillingDetails>{};

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectBookState).subscribe((state: BookState) => {
      this.books = state.collectionItems;
      this.billingDetails = state.billingDetails;
    });
  }
}
