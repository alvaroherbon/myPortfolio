import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Book from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  booksForm: FormGroup;
  books: Book[];
  constructor(private booksService: BooksService) {
    this.booksForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      mark: new FormControl(''),
      cover_url: new FormControl(''),
    });
  }

  get title() {
    return this.booksForm.get('title');
  }

  ngOnInit(): void {
    this.refreshList();
  }

  async addBook() {
    const response = this.booksService.addBook(this.booksForm.value);
    console.log(response);
  }

  refreshList() {
    this.booksService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  deleteBook(id: string | undefined) {
    this.booksService.deleteBook(id).then(() => {
      this.refreshList();
    });
  }

  editBook(id: string | undefined) {
    this.booksService.updateBook(id, this.booksForm.value);
    this.refreshList();
  }

  viewBook(id: string | undefined) {
    const book = this.books.find((book) => book.id === id);
  }
}
