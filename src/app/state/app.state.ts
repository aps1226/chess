import { IPiece, IBoardSquare, Selection } from './model';

export interface AppState {
  readonly pieces: IPiece[];
  readonly turns: number;
  readonly boardSquares: IBoardSquare[];
  readonly check: boolean;
  readonly selection: Selection;
}