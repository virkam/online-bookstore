import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';


@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
 
  previousCategory : number = 1;
  // new properties for serverside paging 
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;


  constructor(private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _cartService : CartService,
    _config : NgbPaginationConfig 
  ) {
        _config.maxSize = 3;
        _config.boundaryLinks = true;
   }
 


  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }



  listBooks() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchBooks();

    } else {
      this.handleListBooks();
    }
  }

  handleListBooks() {
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = 1; 
    }
//setting up current paget to 1, if user navigates the other categoty
    if(this.previousCategory != this.currentCategoryId)
    {
      this.currentPage = 1;
 
    }

 
    this.previousCategory = this.currentCategoryId;
 
    this._bookService.getBooks(this.currentCategoryId,this.currentPage -1,this.pageSize).subscribe(
       this.processPaginate()
      /* data =>{
        console.log(data);
      }*/
    )
  }


  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
 
    this._bookService.searchBooks(keyword, this.currentPage -1,this.pageSize).subscribe(
      this.processPaginate()
      //data => this.books = data
 
      /* data =>{
        console.log(data);
      }*/
    )
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
 
    this.currentPage = 1;
 
    this.listBooks();
  }

  processPaginate()
  {
    return data =>
    {
      this.books = data._embedded.books;
      // page from start from 1 index 
      this.currentPage = data.page.number + 1;
      this.totalRecords =   data.page.totalElements;
      this.pageSize = data.page.size;
    } 
  }

  addToCart(book : Book)
  {
    console.log(`book name ${book.name}, and price : ${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }

  /*
    books: Book[] =
    [
      {
        "sku": "text-100",
        "name": "C Programming Language",
        "description": "Learn C Programming Language",
        "unitPrice": 600.00,
        "imageUrl": "assets/images/books/text-100.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-101",
        "name": "C# Crash Course",
        "description": "Learn C# Programming Language",
        "unitPrice": 900.00,
        "imageUrl": "assets/images/books/text-101.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-102",
        "name": "C++ Crash Course",
        "description": "Learn C++ Programming Language",
        "unitPrice": 700.00,
        "imageUrl": "assets/images/books/text-102.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-103",
        "name": "Cracking The Coding Interview",
        "description": "Learn Cracking the coding interview",
        "unitPrice": 1000.00,
        "imageUrl": "assets/images/books/text-103.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-104",
        "name": "Data Structures And Algorithms",
        "description": "Learn data structures and algorithms",
        "unitPrice": 1200.00,
        "imageUrl": "assets/images/books/text-104.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-105",
        "name": "Head First Design Patterns",
        "description": "Learn design patterns from head first",
        "unitPrice": 600.00,
        "imageUrl": "assets/images/books/text-105.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-106",
        "name": "Java Programming",
        "description": "Learn java programming from scratch",
        "unitPrice": 800.00,
        "imageUrl": "assets/images/books/text-106.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-107",
        "name": "ML With Python",
        "description": "Learn machine learning with python",
        "unitPrice": 1500.00,
        "imageUrl": "assets/images/books/text-107.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-108",
        "name": "Practical API Design",
        "description": "Learn how to design API practically",
        "unitPrice": 999.00,
        "imageUrl": "assets/images/books/text-108.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    },
    {
        "sku": "text-109",
        "name": "Python Programming",
        "description": "Learn python programming from scratch",
        "unitPrice": 499.00,
        "imageUrl": "assets/images/books/text-109.png",
        "active": true,
        "unitsInStock": 100,
        "createdOn": new Date(),
        "updatedOn": null
    }
  
    ]
  
  */

}
