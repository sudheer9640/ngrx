import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Book } from '../models/book.model';
import {
  selectBillingDetails,
  selectCollectionItems,
} from '../state/book.selector';
import { BillingDetails } from '../models/billing-details.model';

@Component({
  selector: 'books-demo-app-books-collection',
  templateUrl: './books-collection.component.html',
  styleUrls: ['./books-collection.component.scss'],
})
export class BooksCollectionComponent implements OnInit {
  books$: Observable<Book[]>;
  billingDetails = <BillingDetails>{};

  constructor(private store: Store) {
    this.books$ = store.select(selectCollectionItems);
  }

  ngOnInit(): void {
    this.store.select(selectBillingDetails).subscribe((b) => {
      this.billingDetails = b;
    });
  }
}
