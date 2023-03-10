import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Book from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  book: Book;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe((data) => {
      this.book = data;
    });
  }
}
