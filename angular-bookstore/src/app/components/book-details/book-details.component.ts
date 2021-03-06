import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/common/book';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book = new Book();

  constructor(private _activatedRoute : ActivatedRoute,
              private _bookServices: BookService,
              private _cartService : CartService) { }

  ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(
          () => {
            this.getBookInfo();
        }
        )
  }

  getBookInfo()
  {
    const id : number =+this._activatedRoute.snapshot.paramMap.get('id');
    this._bookServices.get(id).subscribe
    (
        data => {
          this.book = data;
        }
    )
  }

  addToCart()
  {
       
    const cartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);

  }

}
