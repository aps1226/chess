import { createAction, props } from '@ngrx/store';

import { IBoardSquare, IPiece, Selection, GameStatus } from './model';


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

export const modifyGameStatus = createAction(
  '[CHECK] MODIFY',
  props<{ gameStatus: GameStatus }>()
);

export const modifySelection= createAction(
  '[SELECTION] MODIFY',
  props<{ selection: Selection }>()
);

export const modifyCastle= createAction(
  '[CASTLE] MODIFY',
  props<{ piece: Selection }>()
);



