import { Component, OnInit, Input } from '@angular/core';
import { pieces } from '../pieces';

import { IPiece } from '../pieces.model';

@Component({
  selector: 'app-board-piece',
  templateUrl: './board-piece.component.html',
  styleUrls: ['./board-piece.component.css']
})
export class BoardPieceComponent implements OnInit {

  @Input('piece') piece!:IPiece;

  constructor() { }

  ngOnInit(): void {
  }

}
