import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { BooksCollectionComponent } from './books-collection.component';
import {SharedModule} from '../../shared/shared.module';
import { mockStoreInitialState } from '../../testHelpers/test.helper';
import { BooksListComponent } from '../books-list/books-list.component';

describe('BooksCollectionComponent', () => {
  let component: BooksCollectionComponent;
  let fixture: ComponentFixture<BooksCollectionComponent>;
  let store: MockStore;
  const initialState = mockStoreInitialState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksCollectionComponent,BooksListComponent ],
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


  it('should get collection items on load', () => {
    component.ngOnInit();
    expect(component.books).toEqual(initialState.books.collectionItems);
  });

});
