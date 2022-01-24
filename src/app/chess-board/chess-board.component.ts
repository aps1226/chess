import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {

  columns:string[] = ['a','b','c','d','e','f','g','h'];
  rows:string[] = ['8','7','6','5','4','3','2','1'];
  colors:string[] = ['white','black'];

  constructor() { }

  ngOnInit(): void {
  }

}
