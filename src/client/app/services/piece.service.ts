import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Point } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';

import { PawnService } from './pawn.service';
import { RookService } from './rook.service';
import { KnightService } from './knight.service';
import { BishopService } from './bishop.service';
import { QueenService } from './queen.service';
import { KingService } from './king.service';
import { AppState } from '../state/app.state';
import { columns } from '../state/columns';
import * as PiecesActions from '../state/state.actions';
import { getTurns, getBoardSquares, getCastle, getPieces, getState } from '../state/state.selector';
import { IBoardSquare, IPiece, Castle, CastlePieces, Selection} from '../state/model';
import { AuthService } from './authentication.service';
import { SocketioService } from './socketio.service';

interface Memo {
  [key: string]: true;
}

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  pieces$: Observable<IPiece[]>;
  pieces: IPiece[] = [];
  
  boardSquare$: Observable<IBoardSquare[]>;
  boardSquares: IBoardSquare[] = [];

  turn$: Observable<number>;
  turns: number = 0;

  userID!: string;

  constructor(
    private store: Store<AppState>,
    private pawnService: PawnService,
    private rookService: RookService,
    private knightService: KnightService,
    private bishopService: BishopService,
    private queenService: QueenService,
    private kingService: KingService,
    private authService: AuthService,
    private socketService: SocketioService,
  ) {

    this.pieces$ = this.store.select(getPieces);
    this.pieces$.subscribe((pieces$) =>this.pieces = [...pieces$]);

    this.boardSquare$ = this.store.select(getBoardSquares);
    this.boardSquare$.subscribe((boardSquare$) =>this.boardSquares = [...boardSquare$]);

    this.turn$ = this.store.select(getTurns);
    this.turn$.subscribe((turn$) => this.turns = turn$);

    this.userID = this.authService.getUserID();
  }

  // Render position based on which possible move the piece
  // is dragged, or dropped, closest to.
  renderPosition(
    curPos:Point,
    curPiece: IPiece,
    moves: IBoardSquare[],
  ){
    const{
      x:curX,
      y:curY
    } = curPos;

    let closestPos:Point = {
      x:curX,
      y:curY,
    }
    let closestDist:number = Number.MAX_SAFE_INTEGER;

    for(const move of moves){
      const {x,y} = move;
      const distance = Math.sqrt( 
        Math.pow( Math.abs(x - curX), 2) + Math.pow( Math.abs(y - curY), 2) 
      );
      if(distance < closestDist){
        closestDist = distance;
        closestPos = {x,y};
      }
    }

    return closestPos;
  };

  // Get all possible moves for the respective piece.
  getPossibleMoves(
    piece:IPiece,
    pieces: IPiece[],
  ){
    
    
    // Base case for if it is not the piece's respective color's turn
    // or if the piece does not belong to the respective player.
    const playersTurn = this.turns % 2 === 0 ? 'white' : 'black';
    if(piece.color !== playersTurn || piece.userID !== this.userID){
      const curSquare = this.boardSquares.filter(({square}) => square === piece.location)[0];
      return [curSquare];
    }

    const res: IBoardSquare[] = [];
    const {type} = piece;
    switch(type){
      case 'pawn':
        res.push(
          ...this.pawnService.getViablePos(
            piece, 
            pieces, 
          )
        );
        break;
      case 'rook':
        res.push(
          ...this.rookService.getViablePos(
            piece, 
            pieces,
          )
        );
        break;
      case 'knight':
        res.push(
          ...this.knightService.getViablePos(
            piece, 
            pieces,
          )
        );
        break;
      case 'bishop':
        res.push(
          ...this.bishopService.getViablePos(
            piece, 
            pieces, 
          )
        );
        break;
      case 'queen':
        res.push(
          ...this.queenService.getViablePos(
            piece, 
            pieces, 
          )
        );
        break;
      case 'king':
        res.push(
          ...this.kingService.getViablePos(
            piece, 
            pieces, 
          )
        );
        break;
    }
    return res;
  }

  // Filter all respective moves from possible moves that would
  // result in the piece's respective king being in check.
  filterMoves(
    curPiece: IPiece,
    moves: IBoardSquare[],
    pieces: IPiece[],
    boardSquares: IBoardSquare[],
  ){
    const res: IBoardSquare[] = [];
    const allPiecesExcluding = pieces.filter(({name}) => name !== curPiece.name);
    for(const move of moves){
      const newPieces = [
        ...allPiecesExcluding
          // Filter simulate a piece being taken by the respective move.
          .filter(({location}) => location !== move.square),
        {
          ...curPiece,
          location:move.square,
        }
      ];
      const inCheck = this.inCheck(
        newPieces,
        boardSquares
      );
      if(!inCheck || move.square === curPiece.location) res.push(move);
    }
    return res;
  }

  inCheck(
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    const playersTurn = this.turns % 2 !== 0 ? 'black' : 'white';
    const posCaptureMoves = this.captureVectors(
      pieces,
      pieces.filter(({color}) => color !== playersTurn),
      boardSquares
    );
    const king = pieces.filter(
      ({color,type}) =>  color === playersTurn && type === 'king'
    )[0];
    const check = posCaptureMoves.filter(({square}) => square === king.location).length > 0;
    return check
  }

  inCheckMate(
    turns:number,
    pieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    let checkMate = true;
    const playersTurn = this.turns % 2 !== 0 ? 'black' : 'white';
    const resPieces = pieces.filter(({color}) =>  color === playersTurn);
    // Can the checked kings pieces escape the check.
    const checkedPieces = [...pieces.filter(({color}) =>  color !== playersTurn)];
    // Get all possible moves for each checked piece.
    for(let checkedPiece of checkedPieces){
      const moves = [];
      const allPiecesExcluding = pieces.filter(({name}) => name !== checkedPiece.name);
      const { type } = checkedPiece;
      switch(type){
        case 'pawn':
          moves.push(
            ...this.pawnService.getViablePos(
              checkedPiece,
              pieces,
            )
          );
          break;
        case 'rook':
          moves.push(
            ...this.rookService.getViablePos(
              checkedPiece,
              pieces,
            )
          )
          break;
        case 'knight':
          moves.push(
            ...this.knightService.getViablePos(
              checkedPiece,
              pieces,
            )
          )
          break;
        case 'bishop':
          moves.push(
            ...this.bishopService.getViablePos(
              checkedPiece,
              pieces,
            )
          )
          break;
        case 'queen':
          moves.push(
            ...this.queenService.getViablePos(
              checkedPiece,
              pieces,
            )
          )
          break;
        case 'king':
          moves.push(
            ...this.kingService.getViablePos(
              checkedPiece,
              pieces,
            )
          )
          break;
        default:
          break;
      }
      for(const move of moves){
        const curPiece = {
          ...checkedPiece,
          location:move.square
        };
        const newPieces = [
          ...allPiecesExcluding,
          curPiece
        ];
        const stillInCheck = this.inCheck(
          newPieces,
          boardSquares
        )
        if(!stillInCheck){
          checkMate = false;
          break;
        }
      }
      resPieces.push(checkedPiece);
    }
    this.store.dispatch(PiecesActions.modifyPieces({pieces:resPieces}));
    return checkMate;
  }

  captureVectors(
    allPieces: IPiece[],
    attackingPieces:IPiece[],
    boardSquares:IBoardSquare[],
  ){
    const memo:Memo = {};
    const checkVectors:IBoardSquare[] = [];
    for(const piece of attackingPieces){
      const {type,location,moved,color} = piece;
      const col = location.split('')[0];
      const row = Number(location.split('')[1]);
      const res = [];
      switch(type){
        case 'pawn':
          res.push(
            ...this.pawnService.positionsOfCheck(
              piece,
              boardSquares
            )
          );
          break;
        case 'rook':
          res.push(
            ...this.rookService.getViablePos(
              piece,
              allPieces,
            )
          );
          break;
        case 'knight':
          res.push(
            ...this.knightService.getViablePos(
              piece,
              allPieces,
            )
          )
          break;
        case 'bishop':
          res.push(
            ...this.bishopService.getViablePos(
              piece,
              allPieces,
            )
          );
          break;
        case 'queen':
          res.push(
            ...this.queenService.getViablePos(
              piece,
              allPieces,
            )
          );
          break;
        case 'king':
          res.push(
            ...this.kingService.getViablePos(
              piece,
              allPieces,
            )
          );
          break;
        default:
          break;
      }
      res.map((curSquare) =>{
        if(!memo[curSquare.square]){
          memo[curSquare.square] = true;
          checkVectors.push(curSquare);
        }
      })
    }
    return checkVectors;
  }

  castle(
    castlePieces: CastlePieces,
  ){
    const {king,rook} = castlePieces;

    // Base case.
    if(
      !king || 
      king.moved ||
      !rook ||
      rook.moved
      ) return;
    
    const side = rook.name.split('_')[1];
    switch(side){
      case '1':
        this.castleKingSide(king,rook);
        break;
      case '2':
        this.castleQueenSide(king,rook);
        break;
    }
  }

  castleKingSide(
    king: Selection,
    rook: Selection
  ){
    const row = king.location.split('')[1];

    // Check that there is an open path
    // to the king.
    const leftOfKing = 'c'+ row;
    const canCastle = rook['moves'].filter(
      ({square}) => square === leftOfKing
    )[0];

    // Base case.
    if(!canCastle) return;

    // Update king's location.
    const kingPiece = this.pieces.filter(({name}) => name === king.name)[0];
    const newKingPiece = {
      ...kingPiece,
      location:'c'+ row,
      moved:true
    }
    this.store.dispatch(PiecesActions.modifyPiece({piece:newKingPiece,turns:this.turns}));

    // Update rook's location.
    const rookPiece = this.pieces.filter(({name}) => name === rook.name)[0];
    const newRookPiece = {
      ...rookPiece,
      location:'d'+ row,
      moved:true
    }
    this.store.dispatch(PiecesActions.modifyPiece({piece:newRookPiece,turns:this.turns}));
    // Increment turns.
    const newTurns = this.turns + 1;
    this.store.dispatch(PiecesActions.incrementTurn({turns:newTurns}));

    // Send new state data to socket connection.
    let newState!:AppState;
    this.store.select(getState).subscribe(state => newState = state);
    this.socketService.sendData(newState);
  }

  castleQueenSide(
    king: Selection,
    rook: Selection
  ){
    const row = king.location.split('')[1];

    // Check that there is an open path
    // to the king.
    const rightOfKing = 'e'+ row;
    const canCastle = rook['moves'].filter(
      ({square}) => square === rightOfKing
    )[0];

    // Base case.
    if(!canCastle) return;
    // Update king's location.
    const kingPiece = this.pieces.filter(({name}) => name === king.name)[0];
    const newKingPiece = {
      ...kingPiece,
      location:'g'+ row,
      moved:true
    }
    this.store.dispatch(PiecesActions.modifyPiece({piece:newKingPiece,turns:this.turns}));
    // Update rook's location.
    const rookPiece = this.pieces.filter(({name}) => name === rook.name)[0];
    const newRookPiece = {
      ...rookPiece,
      location:'f'+ row,
      moved:true
    }
    this.store.dispatch(PiecesActions.modifyPiece({piece:newRookPiece,turns:this.turns}));
    // Increment turns.
    const newTurns = this.turns + 1;
    this.store.dispatch(PiecesActions.incrementTurn({turns:newTurns}));

    // Send new state data to socket connection.
    let newState!:AppState;
    this.store.select(getState).subscribe(state => newState = state);
    this.socketService.sendData(newState);
  }

}
