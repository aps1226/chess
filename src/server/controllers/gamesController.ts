import express, {Request, Response, NextFunction} from 'express';

const gamesController = {
  newGame: (db:any )  =>{
      return function(req : Request, resp: Response ,next: NextFunction){
        
        if(!req["body"]["playerIds"] || !req["body"]["playerIds"].length){
            const result = JSON.stringify('Player IDs for the new game were not sent.');
            resp.status(400);
            resp.send(result);
            return;
        };

        const [playerW,playerB] = req["body"]["playerIds"];

        const sql =
        `
        INSERT INTO games (playerW, playerB, winner, tie, turns,blackRook_1, blackKnight_1, blackBishop_1, blackKing, blackQueen, blackBishop_2, blackKnight_2, blackRook_2,
            blackPawn_1, blackPawn_2, blackPawn_3, blackPawn_4, blackPawn_5, blackPawn_6, blackPawn_7, blackPawn_8,
            whiteRook_1, whiteKnight_1, whiteBishop_1, whiteKing, whiteQueen, whiteBishop_2, whiteKnight_2, whiteRook_2,
            whitePawn_1, whitePawn_2, whitePawn_3, whitePawn_4, whitePawn_5, whitePawn_6, whitePawn_7, whitePawn_8)
        VALUES (${playerW}, ${playerB}, 0, 0, 0,'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
            'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
            'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
            'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1');
        `;
        db.query(sql,(err:any,res:any) =>{
          if(err) throw(err);
          console.log(res)
          resp["locals"]["queryResult"] = res;
          next();
        });
      }
  },
  findGame: (db:any )  =>{
      return function(req : Request, resp: Response ,next: NextFunction){
        
        if(!req["body"]["gameID"]){
            const result = JSON.stringify('No game ID was sent.');
            resp.status(400);
            resp.send(result);
            return;
        };
  
        const {gameID} = req.body;
        const sql =`SELECT * FROM games  WHERE gameID = '${gameID}';`;
        db.query(sql,(err:any,res:any) =>{
          if(err) throw(err);
          console.log(res)
          resp["locals"]["queryResult"] = res;
          next();
        });
      }
  },

  updateGame: (db:any )  =>{
      return function(req : Request, resp: Response ,next: NextFunction){

        if(!req["body"]["gameID"]){
            const result = JSON.stringify('No game ID was sent.');
            resp.status(400);
            resp.send(result);
            return;
        };
        if(!req["body"]["field"]){
            const result = JSON.stringify('Update field not specified.');
            resp.status(400);
            resp.send(result);
            return;
        };
        if(!req["body"]["value"]){
            const result = JSON.stringify('Update value not specified.');
            resp.status(400);
            resp.send(result);
            return;
        };
  
        const {gameID, field, value} = req.body;
        const sql =
        `
        UPDATE games
        SET ${field} = '${value}'
        WHERE gameID = '${gameID}';
        `;
        db.query(sql,(err:any,res:any) =>{
          if(err) throw(err);
          next();
        });
      }
  },


};

export default gamesController;
