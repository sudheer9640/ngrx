import {
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../shared/shared.module';
import { AddToCart } from '../state/book.actions';
import { BooksDetailsComponent } from './books-details.component';
import { mockStoreInitialState2 } from '../../testHelpers/test.helper';
import { BooksListComponent } from '../books-list/books-list.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BooksDetailsComponent', () => {
  let component: BooksDetailsComponent;
  let fixture: ComponentFixture<BooksDetailsComponent>;
  let store: MockStore;

  const initialState = mockStoreInitialState2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BooksDetailsComponent,
        BooksListComponent
      ],
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(BooksDetailsComponent);
    component = fixture.componentInstance;
    store.setState(initialState);
    spyOn(store, 'dispatch').and.callFake(() => {
      return;
    });
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch add to cart action', fakeAsync(() => {
    component.addToCart();
    expect(store.dispatch).toHaveBeenCalledWith(
      AddToCart({ book: initialState.books.selectedBook })
    );
  }));
});
