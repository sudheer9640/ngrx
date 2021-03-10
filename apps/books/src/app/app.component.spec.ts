import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChangeDetectorRef} from '@angular/core';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { mockStoreInitialState } from './testUtils/test.util';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  const initialState = mockStoreInitialState;
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

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get cart and collection items length', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();
  });


  it('should unsubscribe', () => {
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toBeTruthy();
  });

});
