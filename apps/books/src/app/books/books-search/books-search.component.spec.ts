import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { LoadBooks, SearchBook } from '../store/book.actions';
import { BooksSearchComponent } from './books-search.component';
import {SharedModule} from '../../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('BooksSearchComponent', () => {
  let component: BooksSearchComponent;
  let fixture: ComponentFixture<BooksSearchComponent>;
  let store: MockStore;
  const initialState = {
    books: {
      list: [],
      cartItems: [],
      selectedBook: {},
      collectionItems: [],
      searchKey: '',
      loaded: false,
      billingDetails: {}
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksSearchComponent ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({ initialState } ),
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksSearchComponent);
    component = fixture.componentInstance;
    store.setState(initialState);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch load books and search books action', () => {
    component.bookSearchString = 'angular js';
    component.searchBooks();
    expect(store.dispatch).toHaveBeenCalledWith(LoadBooks({ key: 'angular js' }));
    expect(store.dispatch).toHaveBeenCalledWith(SearchBook({ key: 'angular js' }));
  });
});
