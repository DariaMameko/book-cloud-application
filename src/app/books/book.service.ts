import { Injectable } from '@angular/core';
import { Book } from './book';
import { Http, Response } from '@angular/http';

@Injectable()
export class BookService {
    private booksUrl = '/api/books';

    constructor (private http: Http) {}

    // get("/api/Books")
    getBooks(): Promise<void | Book[]> {
      return this.http.get(this.booksUrl)
                 .toPromise()
                 .then(response => response.json() as Book[])
                 .catch(this.handleError);
    }

    // post("/api/Books")
    createBook(newBook: Book): Promise<void | Book> {
      return this.http.post(this.booksUrl, newBook)
                 .toPromise()
                 .then(response => response.json() as Book)
                 .catch(this.handleError);
    }

    // get("/api/Books/:id") endpoint not used by Angular app

    // delete("/api/Books/:id")
    deleteBook(delBookId: String): Promise<void | String> {
      return this.http.delete(this.booksUrl + '/' + delBookId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/Books/:id")
    updateBook(putBook: Book): Promise<void | Book> {
      var putUrl = this.booksUrl + '/' + putBook._id;
      return this.http.put(putUrl, putBook)
                 .toPromise()
                 .then(response => response.json() as Book)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}