import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { AddToCart, GetBook, GetBookSuccess } from '../store/book.actions';
import {Book} from '../models/book.model';
import {Subscription} from 'rxjs';
import {selectBook} from '../store/book.selector';
import { Utilities } from '../../shared/utilities';

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
    this.bookSubscription = this.store.select(selectBook).subscribe((book: Book) => {
      this.book = Utilities.nestedClone(book);
      console.log(this.book)
      if (this.book && this.book.volumeInfo && this.book.volumeInfo?.averageRating) {
        const rating = this.book.volumeInfo?.averageRating;
        if (Utilities.isInt(rating)) {
          this.book.volumeInfo.averageRating = rating;
        } else {
          console.log('float', this.book.volumeInfo?.averageRating, Math.floor(rating));
          this.book.volumeInfo.averageRating = Math.floor(rating);
          console.log('float hey', this.book.volumeInfo.averageRating)
          const decimalPart = rating - Math.floor(rating);
          this.book.volumeInfo.averageRatingPercentage = Math.floor((decimalPart) * 100)
          console.log(this.book.volumeInfo.averageRatingPercentage)
        }
      }
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
