import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books.routing.module';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { BooksSearchComponent } from './books-search/books-search.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { BooksCartComponent } from './books-cart/books-cart.component';
import { BooksCollectionComponent } from './books-collection/books-collection.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';
import { BooksListComponent } from './books-list/books-list.component';
import { booksReducer } from './state/book.reducer';
import { BookEffects } from './state/book.effects';
import { BooksService } from './services/books/books.service';

@NgModule({
  declarations: [
    BooksSearchComponent,
    BooksDetailsComponent,
    BooksCartComponent,
    BooksCollectionComponent,
    BillingDetailsComponent,
    BooksListComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    EffectsModule.forFeature([BookEffects]),
    StoreModule.forFeature('books', booksReducer),
    SharedModule,
  ],
  providers: [BooksService],
})
export class BooksModule {}
