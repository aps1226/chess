import { createAction, props } from '@ngrx/store';

import { IBoardSquare, IPiece, Selection } from './model';


export const modifyPiece = createAction(
  '[PIECE] MODIFY',
  props<{ piece: IPiece, turns:number }>()
);

export const modifyPieces = createAction(
  '[PIECES] MODIFY',
  props<{ pieces: IPiece[]}>()
);

export const removePiece = createAction(
  '[PIECES] REMOVE',
  props<{ pieceName: string }>()
);

export const incrementTurn = createAction(
  '[TURN] INCREMENT',
);

export const modifyBoardSquare = createAction(
  '[BOARD SQUARE] MODIFY',
  props<{ boardSquare: IBoardSquare }>()
);

export const modifyCheck = createAction(
  '[CHECK] MODIFY',
  props<{ check: boolean }>()
);

export const modifySelection= createAction(
  '[SELECTION] MODIFY',
  props<{ selection: Selection }>()
);



