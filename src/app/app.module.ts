import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookListComponent } from './books/book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
