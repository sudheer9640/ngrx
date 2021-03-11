import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.state';
import { booksFeatureKey } from './book.reducer';

export const selectBookState = createFeatureSelector<BookState>(
  booksFeatureKey
);

export const selectBooks = createSelector(
  selectBookState,
  (state: BookState) => [...state.list]
);

export const selectSearchKey = createSelector(
  selectBookState,
  (state: BookState) => state.searchKey
);

export const selectBook = createSelector(
  selectBookState,
  (state: BookState) => state.selectedBook
);

export const selectCartItems = createSelector(
  selectBookState,
  (state: BookState) => [...state.cartItems]
);

export const selectCollectionItems = createSelector(
  selectBookState,
  (state: BookState) => [...state.collectionItems]
);

export const selectBillingDetails = createSelector(
  selectBookState,
  (state: BookState) => state.billingDetails
);
