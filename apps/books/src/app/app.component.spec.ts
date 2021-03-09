import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChangeDetectorRef} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let store: MockStore;
  const initialState = {
    books: {
      list: [],
      cartItems: [],
      selectedBook: {},
      collectionItems: [],
      searchKey: '',
      loaded: false,
      billingDetails: {
        name: 'test',
        email: 'test@gmail.com',
        phoneNumber: 99999999999,
        address: 'test address'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ChangeDetectorRef, useValue: {} },
        provideMockStore({ initialState })
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    store.setState(initialState);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



});
