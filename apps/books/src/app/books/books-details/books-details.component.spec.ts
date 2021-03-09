import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {SharedModule} from '../../shared/shared.module';
import {AddToCart} from '../state/book.actions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {BooksCartComponent} from '../books-cart/books-cart.component';
import {BillingDetailsComponent} from '../billing-details/billing-details.component';
import {BooksDetailsComponent} from './books-details.component';
import { BooksComponent } from '../books.component';

describe('BooksDetailsComponent', () => {
  let component: BooksDetailsComponent;
  let fixture: ComponentFixture<BooksDetailsComponent>;
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
      declarations: [BooksDetailsComponent, BillingDetailsComponent, BooksComponent, BooksCartComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: BooksComponent, pathMatch: 'full' },
          { path: 'books/cart', component: BooksCartComponent },
          { path: 'books/buyNow/:id', component: BillingDetailsComponent}
        ]),
        SharedModule
      ],
      providers: [
        provideMockStore({initialState})
      ]
    })
      .compileComponents();
    location = TestBed.inject(Location);
    store = TestBed.inject(MockStore);
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(BooksDetailsComponent);
    component = fixture.componentInstance;
    store.setState(initialState);
    const router = TestBed.inject(Router);
    fixture.ngZone.run(() => router.initialNavigation());
    spyOn(store, 'dispatch').and.callFake(() => {});
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch add to cart action', fakeAsync(() => {
    component.addToCart();
    expect(store.dispatch).toHaveBeenCalledWith(AddToCart({book: initialState.books.selectedBook}));
    advance();
    expect(location.path()).toBe('/books/cart');
  }));


});

