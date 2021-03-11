import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { apiEndPoints } from '../../../constants/constants';

describe('HttpService', () => {
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should test post method', inject(
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      const response = { test: {} };
      httpService
        .post(apiEndPoints.BOOK_DETAILS, { userId: 'sadfasd' })
        .subscribe((res) => {
          expect(res).toBeTruthy();
        });
      const result = httpMock.expectOne(apiEndPoints.BOOK_DETAILS, 'test');
      expect(result.request.method).toBe('POST');
      result.flush(response);
      httpTestingController.verify();
    }
  ));

  it('should test get method', inject(
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, httpService: HttpService) => {
      httpService.get(apiEndPoints.BOOKS_QUERY).subscribe((res) => {
        expect(res).toBeTruthy();
      });
      const result = httpMock.expectOne(apiEndPoints.BOOKS_QUERY, 'test');
      expect(result.request.method).toBe('GET');
      result.flush({});
      httpTestingController.verify();
    }
  ));
});
