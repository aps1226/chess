import {createSelector,} from '@ngrx/store';

import { AppState } from './app.state';
import { IBoardSquare, IPiece, Selection, GameStatus, Castle} from './model';

export const selectPieces = (state: AppState) => state.pieces;
export const selectTurns = (state: AppState) => state.turns;
export const selectBoardSquares = (state: AppState) => state.boardSquares;
export const selectGameStatus = (state: AppState) => state.gameStatus;
export const selectSelection = (state: AppState) => state.selection;
export const selectCastle = (state: AppState) => state.castle;

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

export const getGameStatus = createSelector(
    selectGameStatus,
    (check: GameStatus) => check
);

export const getSelection = createSelector(
    selectSelection,
    (selection: Selection) => selection
);

export const getCastle = createSelector(
    selectCastle,
    (castle: Castle) => castle
);
