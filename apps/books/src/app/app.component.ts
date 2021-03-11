import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { selectBookState } from './books/state/book.selector';
import { Subscription } from 'rxjs';

@Component({
  selector: 'books-demo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  cartItemsLength;
  collectionItemsLength;
  booksSubscription: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: Store
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.getSideNavItemsCount();
  }

  getSideNavItemsCount(): void {
    this.booksSubscription = this.store
      .select(selectBookState)
      .subscribe((state) => {
        this.cartItemsLength = state.cartItems.length
          ? state.cartItems.length
          : null;
        this.collectionItemsLength = state.collectionItems.length
          ? state.collectionItems.length
          : null;
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
