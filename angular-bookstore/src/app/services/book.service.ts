import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = "http://localhost:8080/api/v1/books";
  private bookCategoryUrl = "http://localhost:8080/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number,currentPage : number,pageSize : number): Observable<GetResponseBooks> {
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);

  }

  getBookCategory(): Observable<BookCategory[]> {

    return this.httpClient.get<GetResponseBookCategory>(this.bookCategoryUrl).pipe(
      map(response => response._embedded.bookCategory)
    );

  }

  getBooksList(searchUrl: string) {
    return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
      map(response => response._embedded.books)
    );
  }
 
  searchBooks(keyword: String,currentPage : number , pageSize : number ): Observable<GetResponseBooks> {
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;

    return this.httpClient.get<GetResponseBooks>(searchUrl);
 

  }

  get(bookId: number): Observable<Book> {

    const bookDetilsUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Book>(bookDetilsUrl);
  }

}

interface GetResponseBooks {
  _embedded: {
    books: Book[];
  }
}


interface GetResponseBookCategory {
  _embedded: {
    bookCategory: BookCategory[];
  }
  page: {
    //number of records in each page.
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages , starts from 0 index
    totalPages: number,
    //current page
    number: number

  }
}


