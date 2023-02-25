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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Book from '../models/Book';

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

  deleteBook(id: string | undefined) {
    const booksRef = collection(this.firestore, 'books');
    return deleteDoc(doc(booksRef, id));
  }

  updateBook(id: string | undefined, book: Book) {
    const booksRef = collection(this.firestore, 'books');
    //return updateDoc(doc(booksRef, id), book);
  }
}
