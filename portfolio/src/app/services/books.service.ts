import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Book from '../models/Book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  getBook(id: any): Observable<Book> {
    const booksRef = collection(this.firestore, 'books');
    return docData(doc(booksRef, id)) as Observable<Book>;
  }
  constructor(private firestore: Firestore, private http: HttpClient) {}

  addBook(book: Book) {
    const booksRef = collection(this.firestore, 'books');
    return addDoc(booksRef, book);
  }
  getBooks(): Observable<Book[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<Book[]>;
  }

  deleteBook(id: string | undefined) {
    const booksRef = collection(this.firestore, 'books');
    return deleteDoc(doc(booksRef, id));
  }

  updateBook(id: string, book: Book) {
    const booksRef = collection(this.firestore, 'books');
    return updateDoc(doc(booksRef, id), {
      title: book.title,
      author: book.author,
      description: book.description,
      mark: book.mark,
      cover_url: book.cover_url,
      book_url: book.book_url,
    });
  }

  searchBooksOnline(name: String): Observable<any> {
    return this.http.get<any>(`https://openlibrary.org/search.json?q=${name}`);
  }
}
