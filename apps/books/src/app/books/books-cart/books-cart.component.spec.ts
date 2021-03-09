import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BooksCartComponent} from './books-cart.component';
import {SharedModule} from '../../shared/shared.module';
import {BuyBook, RemoveFromCart} from '../store/book.actions';
import {BillingDetailsComponent} from '../billing-details/billing-details.component';

describe('BooksCartComponent', () => {
  let component: BooksCartComponent;
  let fixture: ComponentFixture<BooksCartComponent>;
  let store: MockStore;
  const mockBook = {
    id: 'test',
    buying: true,
    volumeInfo: {
      authors: ['test'],
      description: 'my test description',
      imageLinks: {
        smallThumbnail: 'https://test.com'
      },
      language: 'en',
      pageCount: 20,
      publisher: 'test publisher',
      title: 'test title'
    }
  };
  const initialState = {
    books: {
      list: [],
      cartItems: [],
      selectedBook: mockBook,
      collectionItems: [],
      searchKey: '',
      loaded: false,
      billingDetails: {}
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksCartComponent, BillingDetailsComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'books/buyNow/:id', component: BillingDetailsComponent }
        ]),
        SharedModule
      ],
      providers: [
        provideMockStore({initialState}),
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    store.setState(initialState);
    spyOn(store, 'dispatch').and.callFake(() => {
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should buy book', () => {
    component.buy(initialState.books.selectedBook);
    expect(store.dispatch).toHaveBeenCalledWith(BuyBook({book: initialState.books.selectedBook}));
  });

  it('should remove book from cart', () => {
    component.remove(initialState.books.selectedBook.id);
    expect(store.dispatch).toHaveBeenCalledWith(RemoveFromCart({bookId: initialState.books.selectedBook.id}));
  });
});
