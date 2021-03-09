import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BooksRoutingModule} from './books.routing.module';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';


import {BooksComponent} from './books.component';
import {BooksSearchComponent} from './books-search/books-search.component';
import {BooksDetailsComponent} from './books-details/books-details.component';
import {BooksCartComponent} from './books-cart/books-cart.component';
import {BooksCollectionComponent} from './books-collection/books-collection.component';
import {BillingDetailsComponent} from './billing-details/billing-details.component';
import {booksReducer} from './store/book.reducer';
import {BookEffects} from './store/book.effects';
import {BooksService} from './services/books.service';

@NgModule({
  declarations: [
    BooksComponent,
    BooksSearchComponent,
    BooksDetailsComponent,
    BooksCartComponent,
    BooksCollectionComponent,
    BillingDetailsComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    EffectsModule.forFeature([BookEffects]),
    StoreModule.forFeature('books', booksReducer),
    SharedModule
  ],
  providers: [BooksService]
})
export class BooksModule {
}
