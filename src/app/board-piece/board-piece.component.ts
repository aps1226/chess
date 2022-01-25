import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { AppState } from '../state/app.state';
import * as PiecesActions from '../state/pieces.actions';
import { pieces } from '../state/pieces';
import { IPiece } from '../state/pieces.model';

@Component({
  selector: 'app-board-piece',
  templateUrl: './board-piece.component.html',
  styleUrls: ['./board-piece.component.css']
})
export class BoardPieceComponent implements OnInit {

  @Input('piece') piece!:IPiece;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {}

  handleDrop(event: CdkDragDrop<string>){
    const newPiece: IPiece= {
      ...this.piece,
      ...{location:event.container.data}
    };
    this.store.dispatch(PiecesActions.modifyPiece({piece:newPiece}))
  }

}
