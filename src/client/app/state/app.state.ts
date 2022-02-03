import { IPiece, IBoardSquare, Selection, Castle, GameStatus} from './model';

export interface AppState {
  readonly pieces: IPiece[];
  readonly turns: number;
  readonly boardSquares: IBoardSquare[];
  readonly gameStatus: GameStatus;
  readonly selection: Selection;
  readonly castle: Castle;
}