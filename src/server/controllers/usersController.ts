import express, {Request, Response, NextFunction} from 'express';
import { hash, compare } from '../authentication/bcrypt';

const usersController = {
  newUser: (db:any )  =>{
      return async function(req : Request, resp: Response ,next: NextFunction){
        const {email,password,userName} = req.body;
        const hashedPassword = await hash(password);
        const sql =
        `
        INSERT INTO users (email,password,userName)
        VALUES ('${email}','${hashedPassword}','${userName}');
        `;
        db.query(sql,(err:any,res:any) =>{
          if(err) throw(err);
          resp["locals"]["queryResult"] = res['recordset'];
          next();
        });
      }
  },

  findUser: (db:any )  =>{
      return function(req: Request, resp: Response ,next: NextFunction){
        
        if(!req["body"]["userName"]){
          const result = JSON.stringify('No user name was sent.');
          resp.status(400);
          resp.send(result);
          return;
        };
        if(!req["body"]["password"]){
          const result = JSON.stringify('No password was sent.');
          resp.status(400);
          resp.send(result);
          return;
        };
        
        const {userName, password} = req.body;
        const sql =` SELECT * FROM users WHERE userName = '${userName}');`;
        db.query(sql,(err:any,res:any) =>{
          if(err) throw(err);
          if (!res['recordset'][0]){
            const result = JSON.stringify('User name not found.');
            resp.status(400);
            resp.send(result);
            return;
          }
          else resp["locals"]["queryResult"] = res['recordset'][0];
          next()
        });

      };
  },

  updateUser: (db:any )  =>{
    
      return async function(req: Request, resp: Response ,next: NextFunction){
   
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
        const {userID} = resp["locals"]["queryResult"];
        let {field,value} = req["body"];
        if(field === 'password') value = await hash(value);
        const sql =
        `
        UPDATE users
        SET ${field} = '${value}'
        WHERE userId = '${userID}';
        `;
        db.query(sql,(err:any,res:any) =>{
          if(err) throw(err);
          if(field === 'userName') req["body"]["userName"] = value;
          next()
        });
      };
  },

  allUsers: (db:any )  =>{
    return function(req: Request, resp: Response ,next: NextFunction){
      const sql =`SELECT * FROM users;`;
      db.query(sql,(err:any,res:any) =>{
        if(err) throw(err);
        resp["locals"]["queryResult"] = res['recordset'];
        next();
      });
    };
  },

  deleteUser: (db:any ) =>{
    return function(req: Request, resp: Response ,next: NextFunction){
      const {userID} = resp["locals"]["queryResult"];
      const sql =`
      DELETE FROM users
      WHERE userId = '${userID}';
      `;
      db.query(sql,(err:any,res:any) =>{
        if(err) throw(err);
        resp["locals"]["queryResult"] = true;
        next();
      });
    };
  },

};

export default usersController;
