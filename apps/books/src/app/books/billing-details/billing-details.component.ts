import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AddToCollection, GetBook, RemoveFromCart} from '../state/book.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Book} from '../models/book.model';
import {BookState} from '../state/book.state';
import {BillingDetails} from '../models/billing-details.model';
import { selectBookState } from '../state/book.selector';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.scss']
})

export class BillingDetailsComponent implements OnInit, OnDestroy {

  buyingBook: Book = <Book>{};
  billingDetails: BillingDetails = <BillingDetails>{};
  booksSubscription!: Subscription;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute) {
    route.paramMap.subscribe((params: any) => {
      this.store.dispatch(GetBook({key: params.get('id')}));
    });
    this.billingDetails = new BillingDetails();
  }

  ngOnInit(): void {
   this.booksSubscription =  this.store.select(selectBookState).subscribe(((x: any) => {
      this.buyingBook = { ...x.selectedBook };
      this.billingDetails = { ...x.billingDetails };
    }));
  }

  addToCollection(): void {
    // console.log(this.buyingBook)
    if (this.buyingBook) {
      this.store.dispatch(AddToCollection({book: this.buyingBook, billingDetails: this.billingDetails}));
      this.store.dispatch(RemoveFromCart({bookId: this.buyingBook.id}));
      this.router.navigate(['/books/collection']);
    }
  }

  ngOnDestroy(): void {
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }

}
