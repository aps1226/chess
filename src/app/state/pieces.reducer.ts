import { createReducer, on } from '@ngrx/store';

import * as PiecesActions from './pieces.actions';
import { pieces } from './pieces';
import { IPiece } from './pieces.model'; 
import { ConstantPool } from '@angular/compiler';

export const initialState: IPiece[] = [...pieces];

export const piecesReducer = createReducer(
    initialState,
    on(PiecesActions.modifyPiece, (state, { piece }) =>{
        console.log(piece);
        return [
            ...state.filter(({name}) => name !== piece.name),
            piece
        ]
    }),
    on(PiecesActions.removePiece, (state, { pieceName }) => {
        return [
            ...state.filter(({name}) => name !== pieceName)
        ]
    }),
    on(PiecesActions.getPieces, () => initialState),
);