import { createAction, props } from '@ngrx/store';

import { IPiece } from './pieces.model';


export const modifyPiece = createAction(
  '[PIECES] MODIFY',
  props<{ piece: IPiece }>()
);

export const removePiece = createAction(
  '[PIECES] REMOVE',
  props<{ pieceName: string }>()
);

export const getPieces = createAction(
  '[PIECES] GET',
);