import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BooksService} from './books.service';
import {HttpService} from '../../../shared/services/http/http.service';

describe('BooksService', () => {
  let service: BooksService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        BooksService
      ]
    });
    service = TestBed.inject(BooksService);
    httpService = TestBed.inject(HttpService);
    spyOn(httpService, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get books', () => {
    service.getBooks('angular');
    expect(httpService.get).toHaveBeenCalledWith('https://www.googleapis.com/books/v1/volumes?q=angular');
  });

  it('should call get book', () => {
    service.getBook('test');
    expect(httpService.get).toHaveBeenCalledWith('https://www.googleapis.com/books/v1/volumes/test');
  });
});
