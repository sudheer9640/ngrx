import { booksReducer } from './book.reducer';
import { initialState } from '../store/book.state';
import { Book } from '../models/book.model';
import {
  AddToCart,
  AddToCollection,
  BuyBook,
  GetBook,
  GetBookSuccess,
  LoadBooksSuccess,
  RemoveFromCart
} from './book.actions';
import { BillingDetails } from '../models/billing-details.model';

const mockBook: Book = {
  id: 'testid',
  buying: true,
  volumeInfo: {
    authors: ['test user'],
    description: 'test desc',
    imageLinks: {
      smallThumbnail: 'test.com'
    },
    language: 'en',
    pageCount: 10,
    publisher: 'test pub',
    title: 'test title'
  }
};

describe('books reducer', () => {
  it('should return the default state', () => {
    const action = {
      type: 'Unknown'
    };
    const state = booksReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should getBooksSuccess and update the state in an immutable way', () => {
    const newState: Book = mockBook;
    const action = GetBookSuccess({ book: newState });
    const state = booksReducer(initialState, action);
    expect(state.selectedBook).toEqual(newState);
  });

  it('should LoadBooks and update the state in an immutable way', () => {
    const newState: Array<Book> = [mockBook];
    const action = LoadBooksSuccess({ books: newState, key: 'test' });
    const state = booksReducer(initialState, action);
    expect(state.list).toEqual(newState);
  });

  it('should AddToCart and update the state in an immutable way', () => {
    const action = AddToCart({ book: mockBook });
    const state = booksReducer(initialState, action);
    expect(state.cartItems).toEqual([mockBook]);
  });

  it('should remove from cart and update the state in an immutable way', () => {
    const action = RemoveFromCart({ bookId: mockBook.id });
    const state = booksReducer(initialState, action);
    expect(state.cartItems).toEqual([]);
  });

  it('should buy book and update the state in an immutable way', () => {
    const newState: Book = mockBook;
    const action = BuyBook({ book: newState });
    const state = booksReducer(initialState, action);
    expect(state.cartItems).toEqual([]);
  });

  it('should add to collection and update the state in an immutable way', () => {
    const newState: Book = mockBook;
    const billingDetails: BillingDetails = {
      name: 'test name',
      email: 'test email',
      address: 'sg nagar',
      phoneNumber: 9545594986
    };
    const action = AddToCollection({ book: newState,billingDetails: billingDetails });
    const state = booksReducer(initialState, action);
    expect(state.collectionItems).toEqual([mockBook]);
    expect(state.billingDetails).toEqual(billingDetails);
  });

});
