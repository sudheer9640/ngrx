import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore } from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import {BooksCartComponent} from './books-cart.component';
import { mockStoreInitialState2 } from '../../testHelpers/test.helper';
import { BooksListComponent } from '../books-list/books-list.component';

describe('BooksCartComponent', () => {
  let component: BooksCartComponent;
  let fixture: ComponentFixture<BooksCartComponent>;
  let store: MockStore;

  const initialState = mockStoreInitialState2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksCartComponent, BooksListComponent ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({initialState}),
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store.setState(initialState);
    spyOn(store, 'dispatch').and.callFake(() => { return; });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cart items', () => {
    component.ngOnInit();
    expect(component.books).toEqual(initialState.books.cartItems);
  });

});
