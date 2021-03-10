import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { AddToCart, GetBook, GetBookSuccess } from '../state/book.actions';
import {Book} from '../models/book.model';
import {Subscription} from 'rxjs';
import {selectBook} from '../state/book.selector';
import { CommonUtilities } from '../../shared/utils/commonUtilities';

@Component({
  selector: 'app-books-details',
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss']
})
export class BooksDetailsComponent implements OnInit, OnDestroy {

  book: Book = <Book>{};
  bookSubscription!: Subscription;
// definite assignment assertion to tell typescript that property will be assigned some how by the time its used

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store) {
    route.paramMap.subscribe((params: any) => {
      this.store.dispatch(GetBookSuccess({book: this.book}));
      this.store.dispatch(GetBook({key: params.get('id')}));
    });
  }

  ngOnInit(): void {
    this.getBookDetails();
  }

  getBookDetails() {
    this.bookSubscription = this.store.select(selectBook).subscribe((book: Book) => {
      this.book ={...book};
    });
  }

  addToCart(): void {
    this.store.dispatch(AddToCart({book: this.book}));
    this.router.navigate(['/books/cart']);
  }

  ngOnDestroy(): void {
    if (this.bookSubscription) {
      this.bookSubscription.unsubscribe();
    }
  }
}
