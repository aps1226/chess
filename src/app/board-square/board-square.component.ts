import { Component, OnInit, Input } from '@angular/core';

import {pieces} from '../pieces';
import {IPiece} from '../pieces.model';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.css']
})
export class BoardSquareComponent implements OnInit {

  @Input('column') column: string = '';
  @Input('row') row: string = '';
  @Input('color') color: string = '';

  piece:(IPiece|null) = null;

  constructor() { }

  ngOnInit(): void {
    const index:string = this.column + this.row;
    pieces.map((item) => {
      if(item.location === index) this.piece = item;
    });
  }

}
