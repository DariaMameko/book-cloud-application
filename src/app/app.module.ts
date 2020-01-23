import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BookListComponent,
  },
  { path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  { path: 'about', component: AboutComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    BookListComponent,
    MenuComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
