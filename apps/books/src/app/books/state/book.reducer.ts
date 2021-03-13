import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import {
  AddToCart,
  RemoveFromCart,
  AddToCollection,
  BuyBook,
  LoadBooksSuccess,
  GetBookSuccess,
} from './book.actions';
import { BookState, initialState } from './book.state';
import { Book } from '../models/book.model';

export const booksFeatureKey = 'books';

const bookReducer = createReducer(
  initialState,
  on(GetBookSuccess, (state, { book }) => ({ ...state, selectedBook: book })),
  on(LoadBooksSuccess, (state, { books, key }) => ({
    ...state,
    list: books,
    searchKey: key,
  })),
  on(AddToCart, (state, { book }) => ({
    ...state,
    cartItems: !state.cartItems.includes(book) ? [...state.cartItems, book]: [...state.cartItems],
  })),
  on(RemoveFromCart, (state, { bookId }) => ({
    ...state,
    cartItems: state.cartItems.filter((book: Book) => book.id !== bookId),
  })),
  on(BuyBook, (state, { book }) => ({ ...state, selectedBook: book })),
  on(AddToCollection, (state, { book, billingDetails }) => ({
    ...state,
    collectionItems: [...state.collectionItems, book],
    billingDetails,
  }))
);

export const booksReducer = (state: BookState, action: Action) =>
  bookReducer(state, action);


//    cartItems: [...state.cartItems, book],
