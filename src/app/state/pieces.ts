import * as path from 'path';
import * as url from 'url';
const __filename = url.parse(import.meta.url);
const __dirname = path.dirname(String(__filename));

import {IPiece} from './pieces.model'

export const pieces:IPiece[] = [
    {
        name:'blackRook_1',
        location:'a8',
        src: path.join(__dirname,'/assets/BlackRook.png'),
        moved:false,
    },
    {
        name:'blackKnight_1',
        location:'b8',
        src: path.join(__dirname,'/assets/BlackKnight.png'),
        moved:false,
    },
    {
        name:'blackBishop_1',
        location:'c8',
        src: path.join(__dirname,'/assets/BlackBishop.png'),
        moved:false,
    },
    {
        name:'blackKing',
        location:'d8',
        src: path.join(__dirname,'/assets/BlackKing.png'),
        moved:false,
    },
    {
        name:'blackQueen',
        location:'e8',
        src: path.join(__dirname,'/assets/BlackQueen.png'),
        moved:false,
    },
    {
        name:'blackBishop_2',
        location:'f8',
        src: path.join(__dirname,'/assets/BlackBishop.png'),
        moved:false,
    },
    {
        name:'blackKnight_2',
        location:'g8',
        src: path.join(__dirname,'/assets/BlackKnight.png'),
        moved:false,
    },
    {
        name:'blackRook_2',
        location:'h8',
        src: path.join(__dirname,'/assets/BlackRook.png'),
        moved:false,
    },
    {
        name:'blackPawn_1',
        location:'a7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'blackPawn_2',
        location:'b7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'blackPawn_3',
        location:'c7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'blackPawn_4',
        location:'d7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'blackPawn_5',
        location:'e7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'blackPawn_6',
        location:'f7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'blackPawn_7',
        location:'g7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'blackPawn_8',
        location:'h7',
        src: path.join(__dirname,'/assets/BlackPawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_1',
        location:'a2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_2',
        location:'b2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_3',
        location:'c2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_4',
        location:'d2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_5',
        location:'e2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_5',
        location:'f2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_7',
        location:'g2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whitePawn_8',
        location:'h2',
        src: path.join(__dirname,'/assets/WhitePawn.png'),
        moved:false,
    },
    {
        name:'whiteRook_1',
        location:'a1',
        src: path.join(__dirname,'/assets/WhiteRook.png'),
        moved:false,
    },
    {
        name:'whiteKnight_1',
        location:'b1',
        src: path.join(__dirname,'/assets/WhiteKnight.png'),
        moved:false,
    },
    {
        name:'whiteBishop_1',
        location:'c1',
        src: path.join(__dirname,'/assets/WhiteBishop.png'),
        moved:false,
    },
    {
        name:'whiteKing',
        location:'d1',
        src: path.join(__dirname,'/assets/WhiteKing.png'),
        moved:false,
    },
    {
        name:'whiteQueen',
        location:'e1',
        src: path.join(__dirname,'/assets/WhiteQueen.png'),
        moved:false,
    },
    {
        name:'whiteBishop_2',
        location:'f1',
        src: path.join(__dirname,'/assets/WhiteBishop.png'),
        moved:false,
    },
    {
        name:'whiteKnight_2',
        location:'g1',
        src: path.join(__dirname,'/assets/WhiteKnight.png'),
        moved:false,
    },
    {
        name:'whiteRook_2',
        location:'h1',
        src: path.join(__dirname,'/assets/WhiteRook.png'),
        moved:false
    },
]