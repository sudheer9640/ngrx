import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksSearchComponent } from './books-search/books-search.component';
import { BooksCartComponent } from './books-cart/books-cart.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { BooksCollectionComponent } from './books-collection/books-collection.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'searchBooks',
    pathMatch: 'full',
  },
  { path: 'buyBook/:id', component: BillingDetailsComponent },
  {
    path: 'booksCart',
    component: BooksCartComponent,
    data: { state: 'loadCart' },
  },
  {
    path: 'booksCollection',
    component: BooksCollectionComponent,
    data: { state: 'loadCollection' },
  },
  { path: 'bookDetails/:id', component: BooksDetailsComponent },
  {
    path: 'booksSearch',
    component: BooksSearchComponent,
    data: { state: 'loadBooks' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
