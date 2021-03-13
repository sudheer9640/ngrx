import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddToCollection,
  GetBook,
  RemoveFromCart,
} from '../state/book.actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book.model';
import { BillingDetails } from '../models/billing-details.model';
import { selectBookState } from '../state/book.selector';
import { BookState } from '../state/book.state';

@Component({
  selector: 'books-demo-app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss'],
})

export class BillingDetailsComponent implements OnInit, OnDestroy {

  buyingBook: Book = <Book>{};
  billingDetails: BillingDetails;
  booksSubscription!: Subscription;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute) {
    route.paramMap.subscribe((params: Params) => {
      this.store.dispatch(GetBook({ key: params.get('id') }));
    });
    this.billingDetails = new BillingDetails();
  }

  ngOnInit(): void {
    this.getBillingDetails();
  }

  getBillingDetails() {
    this.booksSubscription = this.store.select(selectBookState).subscribe(((state: BookState) => {
      this.buyingBook = { ...state.selectedBook };
      this.billingDetails = { ...state.billingDetails };
    }));
  }

  addToCollection(): void {
    // console.log(this.buyingBook)
    if (this.buyingBook) {
      this.store.dispatch(AddToCollection({ book: this.buyingBook, billingDetails: this.billingDetails }));
      this.store.dispatch(RemoveFromCart({ bookId: this.buyingBook.id }));
      this.router.navigate(['/booksCollection']);
    }
  }

  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
