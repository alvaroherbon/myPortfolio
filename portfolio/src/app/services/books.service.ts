import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Book from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private firestore: Firestore) {}

  addBook(book: Book) {
    const booksRef = collection(this.firestore, 'books');
    return addDoc(booksRef, book);
  }
  getBooks(): Observable<Book[]> {
    const booksRef = collection(this.firestore, 'books');
    return collectionData(booksRef, { idField: 'id' }) as Observable<Book[]>;
  }
}
