export interface IPiece {
    name:string;
    location:string;
    src:string;
    moved:boolean;
    color:string;
    draggable:boolean;
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