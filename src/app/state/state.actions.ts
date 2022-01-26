import { createAction, props } from '@ngrx/store';

import { IBoardSquare, IPiece } from './model';


export const modifyPiece = createAction(
  '[PIECES] MODIFY',
  props<{ piece: IPiece }>()
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

