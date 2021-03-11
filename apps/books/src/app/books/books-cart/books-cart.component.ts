import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Book } from '../models/book.model';
import { RemoveFromCart } from '../state/book.actions';
import { selectCartItems } from '../state/book.selector';

@Component({
  selector: 'books-demo-app-books-cart',
  templateUrl: './books-cart.component.html',
  styleUrls: ['./books-cart.component.scss'],
})
export class BooksCartComponent implements OnInit{
  books$: Observable<Book[]>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.books$ = this.store.select(selectCartItems);
  }


  buy(book: Book): void {
    // console.log(book);
    this.router.navigate(['/books/buyNow', book.id]);
  }

  remove(bookId: string): void {
    this.store.dispatch(RemoveFromCart({ bookId }));
  }
}
