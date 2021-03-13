import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { BillingDetailsComponent } from './billing-details.component';
import { SharedModule } from '../../shared/shared.module';
import { AddToCollection} from '../state/book.actions';
import {BooksCollectionComponent} from '../books-collection/books-collection.component';
import { mockStoreInitialState2 } from '../../testHelpers/test.helper';
import { BooksListComponent } from '../books-list/books-list.component';

describe('BillingDetailsComponent', () => {
  let component: BillingDetailsComponent;
  let fixture: ComponentFixture<BillingDetailsComponent>;
  let store: MockStore;
  const initialState = mockStoreInitialState2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingDetailsComponent, BooksCollectionComponent, BooksListComponent ],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          {path: 'booksCollection', component: BooksCollectionComponent}
        ]),
        SharedModule,
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callFake(() => { return });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDetailsComponent);
    component = fixture.componentInstance;
    store.setState(initialState);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add book to collection', () => {
    component.addToCollection();
    expect(store.dispatch).toHaveBeenCalledWith(AddToCollection({
      book: initialState.books.selectedBook,
      billingDetails: initialState.books.billingDetails
    }));
  });

});
