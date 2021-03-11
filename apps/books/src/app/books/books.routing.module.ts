import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksComponent } from './books.component';
import { BooksSearchComponent } from './books-search/books-search.component';
import { BooksCartComponent } from './books-cart/books-cart.component';
import { BooksDetailsComponent } from './books-details/books-details.component';
import { BooksCollectionComponent } from './books-collection/books-collection.component';
import { BillingDetailsComponent } from './billing-details/billing-details.component';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'buyNow/:id', component: BillingDetailsComponent },
      { path: 'cart', component: BooksCartComponent },
      { path: 'collection', component: BooksCollectionComponent },
      { path: 'details/:id', component: BooksDetailsComponent },
      { path: 'search', component: BooksSearchComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
