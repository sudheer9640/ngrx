import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { BooksCollectionComponent } from './books-collection.component';
import {SharedModule} from '../../shared/shared.module';

describe('BooksCollectionComponent', () => {
  let component: BooksCollectionComponent;
  let fixture: ComponentFixture<BooksCollectionComponent>;
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
      declarations: [ BooksCollectionComponent ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCollectionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.setState(initialState);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
