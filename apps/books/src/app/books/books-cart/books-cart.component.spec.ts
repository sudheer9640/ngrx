import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {MockStore, provideMockStore } from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import { RemoveFromCart} from '../state/book.actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {BooksCartComponent} from './books-cart.component';
import {BillingDetailsComponent} from '../billing-details/billing-details.component';

describe('BooksCartComponent', () => {
  let component: BooksCartComponent;
  let fixture: ComponentFixture<BooksCartComponent>;
  let store: MockStore;
  let location: Location;

  const mockBook = {
    id: 'test',
    buying: true,
    volumeInfo: {
      authors: ['test'],
      description: 'my test description',
      imageLinks: {
        smallThumbnail: 'https://test.com',
        thumbnail: 'testthumb.com'
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

  function advance() {
    tick();
    fixture.detectChanges();
  }

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
    location = TestBed.inject(Location);
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.setState(initialState);
    const router = TestBed.inject(Router);
    fixture.ngZone.run(() => router.initialNavigation());
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should buy book', fakeAsync(() => {
    component.buy(initialState.books.selectedBook);
    advance();
    expect (location.path()).toBe('/books/buyNow/test');
  }));

  it('should remove book from cart', () => {
    component.remove(initialState.books.selectedBook.id);
    expect(store.dispatch).toHaveBeenCalledWith(RemoveFromCart({bookId: initialState.books.selectedBook.id}));
  });
});