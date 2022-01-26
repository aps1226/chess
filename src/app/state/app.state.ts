import { IPiece, IBoardSquare } from './model';

export interface AppState {
  readonly pieces: IPiece[];
  readonly turns: number;
  readonly boardSquares: IBoardSquare[];
}