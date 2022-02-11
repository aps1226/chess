import { createAction, props } from '@ngrx/store';

import { AppState } from './app.state';
import { IBoardSquare, IPiece, Selection, GameStatus } from './model';


export const modifyState = createAction(
  '[STATE] MODIFY',
  props<{ state: AppState }>()
);

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
  props<{ turns: number }>()
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

export const modifyGameID= createAction(
  '[GAMEID] MODIFY',
  props<{ gameID: number }>()
);



