import { createFeatureSelector, createReducer, on } from '@ngrx/store';

import * as PiecesActions from './state.actions';
import { pieces } from './pieces';
import { ConstantPool } from '@angular/compiler';
import { state } from '@angular/animations';
import { IBoardSquare, IPiece, Selection, Castle, GameStatus } from './model';
import { boardSquares } from './boardSquares';

export const stateReducer = createReducer(
    {},
    on(PiecesActions.modifyState,(state) =>{
        return state;
    })
);

const initialPieces: IPiece[] = [...pieces];

export const piecesReducer = createReducer(
    initialPieces,
    on(PiecesActions.modifyPiece, (state, { piece,turns }) =>{
        const playersTurn = turns % 2 === 0 ? 'black' : 'white';
        const newState = [ 
            ...state.filter(({name}) => name !== piece.name),
            piece
        ].map((item) =>{

            return {
                ...item,
                ...{draggable: item.color === playersTurn}
            }
        })
        return newState;
    }),
    on(PiecesActions.modifyPieces, (state, { pieces }) =>{
        return [...pieces];
    }),
    on(PiecesActions.removePiece, (state, { pieceName }) => {
        return [ ...state.filter(({name}) => name !== pieceName)]
    })
);

const initialTurns: number = 0;

export const turnsReducer = createReducer(
    initialTurns,
    on(PiecesActions.incrementTurn, (state, { turns }) =>{
        return turns;
    })
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

const initialGameStatus: GameStatus = {
    'white': {
        'check': false,
        'checkMate': false,
    },
    'black': {
        'check': false,
        'checkMate': false,
    }
};

export const gameStatusReducer = createReducer(
    initialGameStatus,
    on(PiecesActions.modifyGameStatus, (state, { gameStatus }) =>{
        return gameStatus
    })
);

const initialSelection: Selection = {
    ...pieces[0],
    moves:[initialBoardSquares[0]]
};

export const selectionReducer = createReducer(
    initialSelection,
    on(PiecesActions.modifySelection, (state, { selection }) =>{
        return selection;
    })
);

const initialCastle: Castle = {
    'white': {
        'rook': null,
        'king': null,
    },
    'black': {
        'rook': null,
        'king': null,
    }
};

export const castleReducer = createReducer(
    initialCastle,
    on(PiecesActions.modifyCastle, (state, { piece }) =>{
        const {color} = piece;
        const newState = {
            'white':{
                ...state['white']
            },
            'black':{
                ...state['black']
            },
        };
        switch(color){
            case 'white':
                newState.white[piece.type] = piece;
                break;
            case 'black':
                newState.black[piece.type] = piece;
                break;
            default:
                break;
        }
        return newState;
    })
);

export const gameIDReducer = createReducer(
    0,
    on(PiecesActions.modifyGameID, (state,{ gameID }) =>{
        return gameID;
    })
)
