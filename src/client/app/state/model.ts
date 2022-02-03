export interface IPiece {
    name:string;
    location:string;
    src:string;
    moved:boolean;
    color:string;
    type:string;
}

export interface IBoardSquare {
    square: string;
    top: string;
    right: string;
    bottom: string;
    left: string;
    height:string;
    x:number;
    y:number;
}

export interface Selection extends IPiece {
    moves: IBoardSquare[];
}

interface Statuses {
    [key: string]: boolean;
}

export interface GameStatus {
    [key: string]: Statuses;
}

export interface CastlePieces {
    [key: string]: Selection | null;
}

export interface Castle {
    [key: string]: CastlePieces;
}

export interface Columns {
    [key: string]: number;
}