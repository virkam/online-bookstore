import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  books: Book[] ;

  constructor(private _router : Router) { }
  

  ngOnInit(): void {
    
  }

  searchBooks(keyword : String)
  {
    console.log('keyword',keyword);
     this._router.navigateByUrl('/search/'+keyword);
 
  }

}
