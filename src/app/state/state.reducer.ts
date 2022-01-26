import { createReducer, on } from '@ngrx/store';

import * as PiecesActions from './state.actions';
import { pieces } from './pieces';
import { ConstantPool } from '@angular/compiler';
import { state } from '@angular/animations';
import { IBoardSquare, IPiece } from './model';
import { boardSquares } from './boardSquares';

const nextPlayersTurn = (pieces:IPiece[]) =>{
    pieces.forEach
}

const initialPieces: IPiece[] = [...pieces];

export const piecesReducer = createReducer(
    initialPieces,
    on(PiecesActions.modifyPiece, (state, { piece }) =>{
        const newState = [ 
            ...state.filter(({name}) => name !== piece.name),
            piece
        ].map((item) =>{
            return {
                ...item,
                ...{draggable:!item.draggable}
            }
        })
        return newState;
    }),
    on(PiecesActions.removePiece, (state, { pieceName }) => {
        return [ ...state.filter(({name}) => name !== pieceName)]
    })
);

const initialTurns: number = 0;

export const turnsReducer = createReducer(
    initialTurns,
    on(PiecesActions.incrementTurn, (state, ) => state+1)
);

const initialBoardSquares: IBoardSquare[] = [...boardSquares];

export const boardSquaresReducer = createReducer(
    initialBoardSquares,
    on(PiecesActions.modifyBoardSquare, (state, { boardSquare }) =>{
        return [ 
            ...state.filter(({square}) => square !== boardSquare.square),
            boardSquare
        ];
    })
);
