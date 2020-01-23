import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [BookService]
})

export class BookListComponent implements OnInit {

  books: Book[]
  selectedBook: Book

  constructor(private bookService: BookService) { }

  ngOnInit() {
     this.bookService
      .getBooks()
      .then((books: Book[]) => {
        this.books = books.map((book) => {
          return book;
        });
      });
  }

  private getIndexOfBook = (bookId: String) => {
    return this.books.findIndex((book) => {
      return book._id === bookId;
    });
  }

  selectBook(book: Book) {
    this.selectedBook = book
  }

  createNewBook() {
    var book: Book = {
      name: '',
      author: '',
      year: '',
      picture: ''
    };

    // By default, a newly-created book will have the selected state.
    this.selectBook(book);
  }

  deleteBook = (bookId: String) => {
    var idx = this.getIndexOfBook(bookId);
    if (idx !== -1) {
      this.books.splice(idx, 1);
      this.selectBook(null);
    }
    return this.books;
  }

  addBook = (book: Book) => {
    this.books.push(book);
    this.selectBook(book);
    return this.books;
  }

  updateBook = (book: Book) => {
    var idx = this.getIndexOfBook(book._id);
    if (idx !== -1) {
      this.books[idx] = book;
      this.selectBook(book);
    }
    return this.books;
  }
}