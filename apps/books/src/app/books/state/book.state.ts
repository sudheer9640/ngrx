import { Book } from '../models/book.model';
import { BillingDetails } from '../models/billing-details.model';

export interface BookState {
  list: Book[];
  cartItems: Book[];
  collectionItems: Book[];
  selectedBook: Book;
  loaded: boolean;
  searchKey: string;
  billingDetails: BillingDetails;
}

export const initialState: BookState = {
  list: [],
  cartItems: [],
  collectionItems: [],
  selectedBook: new Book(),
  searchKey: '',
  loaded: false,
  billingDetails: new BillingDetails(),
};
