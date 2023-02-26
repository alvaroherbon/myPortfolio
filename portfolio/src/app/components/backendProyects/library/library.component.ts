import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Book from 'src/app/models/Book';
import { BooksService } from 'src/app/services/books.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  searchBookList: Book[];
  searchBookForm: FormGroup;
  booksForm: FormGroup;
  books: Book[];
  editing: boolean = false;
  editBookId: string = '';
  charging: boolean = false;
  constructor(
    private booksService: BooksService,
    private modalService: NgbModal
  ) {
    this.booksForm = new FormGroup({
      title: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      mark: new FormControl(''),
      cover_url: new FormControl(''),
      book_url: new FormControl(''),
    });
    this.searchBookForm = new FormGroup({
      bookToSearch: new FormControl(''),
    });
  }

  async advancedSearch() {
    const title = this.searchBookForm.value.bookToSearch;
    this.charging = true;
    const response = await this.booksService
      .searchBooksOnline(title)
      .subscribe((data) => {
        this.searchBookList = data.docs.map(
          (book: { title: string; author_name: string; isbn: any[] }) => {
            return {
              title: book.title,
              author: book.author_name,
              mark: 0,
              description: 'No description',
              cover_url: book.isbn
                ? `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`
                : '',
              book_url: book.isbn
                ? `https://openlibrary.org/isbn/${book.isbn[0]}`
                : '',
            };
          }
        );
        this.charging = false;
      });
  }

  async searchBook(title: string) {}

  ngOnInit(): void {
    this.refreshList();
  }

  async addBook() {
    if (this.editing) {
      const response = await this.booksService.updateBook(
        this.editBookId,
        this.booksForm.value
      );
      this.editing = false;
      this.editBookId = '';
    } else {
      const response = this.booksService.addBook(this.booksForm.value);
    }
  }

  selectBook(book: Book) {
    this.booksForm.setValue({
      title: book.title,
      author: book.author,
      description: book.description,
      mark: book.mark,
      cover_url: book.cover_url,
      book_url: book.book_url,
    });
    this.addBook();
    this.modalService.dismissAll();
  }

  refreshList() {
    this.booksService.getBooks().subscribe((books) => {
      this.books = books;
    });
  }

  deleteBook(book: Book) {
    this.booksService.deleteBook(book.id).then(() => {
      this.refreshList();
    });
  }

  editBook(book: Book) {
    this.booksForm.setValue({
      title: book.title,
      author: book.author,
      description: book.description,
      mark: book.mark,
      cover_url: book.cover_url,
      book_url: book.book_url,
    });
    this.editing = true;
    this.editBookId = book.id;
  }

  closeResult = '';

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
