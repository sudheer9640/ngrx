import {createAction, props} from '@ngrx/store';
import {Book} from '../models/book.model';
import {BillingDetails} from '../models/billing-details.model';

export const GetBook = createAction(
  '[Book] - Get Book',
  props<{ key: string }>()
);

export const GetBookSuccess = createAction(
  '[Book] - Get Book Success',
  props<{ book: Book }>()
);

export const LoadBooks = createAction(
  '[Book] - Load Books',
  props<{ key: string }>()
);

export const LoadBooksSuccess = createAction(
  '[Book] - Load Books Success',
  props<{ books: Book[], key: string }>()
);

export const AddToCart = createAction(
  '[Book] - Add To Cart',
  props<{ book: Book }>()
);

export const RemoveFromCart = createAction(
  '[Book] - Remove From Cart',
  props<{ bookId: string }>()
);

export const BuyBook = createAction(
  '[Book] - Buy Book',
  props<{ book: Book }>()
);

export const AddToCollection = createAction(
  '[Book] - Add To Collection',
  props<{ book: Book, billingDetails: BillingDetails }>()
);
