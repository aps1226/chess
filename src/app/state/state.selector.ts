import {createSelector,} from '@ngrx/store';

import { AppState } from './app.state';
import { IBoardSquare, IPiece, Selection } from './model';


export const selectPieces = (state: AppState) => state.pieces;
export const selectTurns = (state: AppState) => state.turns;
export const selectBoardSquares = (state: AppState) => state.boardSquares;
export const selectCheck = (state: AppState) => state.check;
export const selectSelection = (state: AppState) => state.selection;

export const getPieces = createSelector(
    selectPieces,
    (pieces: IPiece[]) => pieces
);

export const getTurns = createSelector(
    selectTurns,
    (turns: number) => turns
);

export const getBoardSquares = createSelector(
    selectBoardSquares,
    (boardSquares: IBoardSquare[]) => boardSquares
);

export const getCheck = createSelector(
    selectCheck,
    (check: boolean) => check
);

export const getSelection = createSelector(
    selectSelection,
    (selection: Selection) => selection
);
