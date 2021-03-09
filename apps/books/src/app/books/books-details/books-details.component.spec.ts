import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {BooksDetailsComponent} from './books-details.component';
import {SharedModule} from '../../shared/shared.module';
import {AddToCart} from '../store/book.actions';
import {BooksCartComponent} from '../books-cart/books-cart.component';
import {BillingDetailsComponent} from '../billing-details/billing-details.component';

describe('BooksDetailsComponent', () => {
  let component: BooksDetailsComponent;
  let fixture: ComponentFixture<BooksDetailsComponent>;
  let store: MockStore;
  const routerSpy = {navigate: jasmine.createSpy('navigate')};

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
      declarations: [BooksDetailsComponent, BillingDetailsComponent, BooksCartComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'books/cart', component: BooksCartComponent },
          { path: 'books/buyNow/:id', component: BillingDetailsComponent}
        ]),
        SharedModule
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.setState(initialState);
    spyOn(store, 'dispatch').and.callFake(() => {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch add to cart action', () => {
    component.addToCart();
    expect(store.dispatch).toHaveBeenCalledWith(AddToCart({book: initialState.books.selectedBook}));
    // expect (routerSpy.navigate).toHaveBeenCalledWith(['/books/cart']);
  });


});

