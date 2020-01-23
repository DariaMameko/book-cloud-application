import { Component, Input } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent {
  @Input()
  book: Book;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private bookService: BookService) {}

  createBook(book: Book) {
    this.bookService.createBook(book).then((newBook: Book) => {
      this.createHandler(newBook);
    });
  }

  updateBook(book: Book): void {
    this.bookService.updateBook(book).then((updatedBook: Book) => {
      this.updateHandler(updatedBook);
    });
  }

  deleteBook(bookId: String): void {
    this.bookService.deleteBook(bookId).then((deletedBookId: String) => {
      this.deleteHandler(deletedBookId);
    });
  }
}