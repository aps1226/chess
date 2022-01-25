import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { AppState } from '../state/app.state';
import * as PiecesActions from '../state/pieces.actions'
import {IPiece} from '../state/pieces.model';

@Component({
  selector: 'app-board-square',
  templateUrl: './board-square.component.html',
  styleUrls: ['./board-square.component.css']
})
export class BoardSquareComponent implements OnInit,OnChanges {

  @Input('column') column: string = '';
  @Input('row') row: string = '';
  @Input('color') color: string = '';
  @Input('pieces') pieces!: IPiece[] | null;
  
  piece!:IPiece | null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    if(this.pieces) this.renderPiece();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.pieces) this.renderPiece();
  }

  renderPiece(){
    const index:string = this.column + this.row;
    const containsPiece = this.pieces?.filter((item) => item.location === index);
    this.piece = containsPiece?.length ? containsPiece[0] : null;
  }

}
