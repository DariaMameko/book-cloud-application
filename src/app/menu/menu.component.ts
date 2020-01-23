import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  clickedBooks: boolean = true;
  clickedAbout: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
