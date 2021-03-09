import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { selectBookState } from './books/state/book.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  cartItemsLength;
  collectionItemsLength;
  booksSubscription: Subscription;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private store: Store) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.booksSubscription =  this.store.select(selectBookState).subscribe(((x: any) => {
      this.cartItemsLength = x.cartItems.length? x.cartItems.length: null;
      this.collectionItemsLength = x.collectionItems.length ? x.collectionItems.length: null ;
    }));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
