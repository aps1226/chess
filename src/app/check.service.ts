import { Injectable } from '@angular/core';

import { KingService } from './king.service';
import { IBoardSquare, IPiece, Columns} from './state/model';

@Injectable({
  providedIn: 'root'
})
export class CheckService {

  constructor(
    private kingService: KingService,
  ) {}

  filterMoves(
    curPiece: IPiece,
    moves: IBoardSquare[],
    pieces: IPiece[],
    boardSquares: IBoardSquare[],
  ){
    const res: IBoardSquare[] = [];
    const allPiecesExcluding = pieces.filter(({name}) => name !== curPiece.name);
    for(const move of moves){
      if(curPiece.name === 'blackKing') console.log(move);
      const newPieces = [
        ...allPiecesExcluding
          // Filter simulate a piece being taken by the respective move.
          .filter(({location}) => location !== move.square),
        {
          ...curPiece,
          location:move.square,
        }
      ];
      const inCheck = this.kingService.inCheck(
        newPieces,
        boardSquares
      );
      if(!inCheck || move.square === curPiece.location) res.push(move);
    }
    return res;
  }

}
