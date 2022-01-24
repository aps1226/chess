import * as path from 'path';
import * as url from 'url';
const __filename = url.parse(import.meta.url);
const __dirname = path.dirname(String(__filename));

import {IPiece} from './pieces.model'

export const pieces:IPiece[] = [
    {
        name:'blackRook_1',
        location:'a8',
        src: path.join(__dirname,'/assets/BlackRook.png')
    },
    {
        name:'blackKnight_1',
        location:'b8',
        src: path.join(__dirname,'/assets/BlackKnight.png')
    },
    {
        name:'blackBishop_1',
        location:'c8',
        src: path.join(__dirname,'/assets/BlackBishop.png')
    },
    {
        name:'blackKing',
        location:'d8',
        src: path.join(__dirname,'/assets/BlackKing.png')
    },
    {
        name:'blackQueen',
        location:'e8',
        src: path.join(__dirname,'/assets/BlackQueen.png')
    },
    {
        name:'blackBishop_2',
        location:'f8',
        src: path.join(__dirname,'/assets/BlackBishop.png')
    },
    {
        name:'blackKnight_2',
        location:'g8',
        src: path.join(__dirname,'/assets/BlackKnight.png')
    },
    {
        name:'blackRook_2',
        location:'h8',
        src: path.join(__dirname,'/assets/BlackRook.png')
    },
    {
        name:'blackRook_2',
        location:'a7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'blackPawn_2',
        location:'b7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'blackPawn_3',
        location:'c7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'blackPawn_4',
        location:'d7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'blackPawn_5',
        location:'e7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'blackPawn_6',
        location:'f7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'blackPawn_7',
        location:'g7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'blackPawn_8',
        location:'h7',
        src: path.join(__dirname,'/assets/BlackPawn.png')
    },
    {
        name:'whitePawn_1',
        location:'a2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whitePawn_2',
        location:'b2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whitePawn_3',
        location:'c2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whitePawn_4',
        location:'d2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whitePawn_5',
        location:'e2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whitePawn_5',
        location:'f2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whitePawn_7',
        location:'g2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whitePawn_8',
        location:'h2',
        src: path.join(__dirname,'/assets/WhitePawn.png')
    },
    {
        name:'whiteRook_1',
        location:'a1',
        src: path.join(__dirname,'/assets/WhiteRook.png')
    },
    {
        name:'whiteKnight_1',
        location:'b1',
        src: path.join(__dirname,'/assets/WhiteKnight.png')
    },
    {
        name:'whiteBishop_1',
        location:'c1',
        src: path.join(__dirname,'/assets/WhiteBishop.png')
    },
    {
        name:'whiteKing',
        location:'d1',
        src: path.join(__dirname,'/assets/WhiteKing.png')
    },
    {
        name:'whiteQueen',
        location:'e1',
        src: path.join(__dirname,'/assets/WhiteQueen.png')
    },
    {
        name:'whiteBishop_2',
        location:'f1',
        src: path.join(__dirname,'/assets/WhiteBishop.png')
    },
    {
        name:'whiteKnight_2',
        location:'g1',
        src: path.join(__dirname,'/assets/WhiteKnight.png')
    },
    {
        name:'whiteRook_2',
        location:'h1',
        src: path.join(__dirname,'/assets/WhiteRook.png')
    },
]