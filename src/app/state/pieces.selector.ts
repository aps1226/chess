import {createSelector} from '@ngrx/store';

import { AppState } from './app.state';
import { IPiece } from './pieces.model';

export const selectPieces = (state: AppState) => state.pieces;
export const getState = createSelector(
    selectPieces,
    (selectedPieces: IPiece[]) => selectedPieces
);