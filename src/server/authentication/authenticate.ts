import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const accessTokenSecret = String(process.env['NODE_ENV'] === 'production' ? process.env['PROD_ACCESS_TOKEN_SECRET'] : process.env['DEV_ACCESS_TOKEN_SECRET']);

export const createToken = (req: Request, res: Response) =>{
    const { userID, userName} = res["locals"]["queryResult"];
    const accessToken = jwt.sign(
        { 
            userID: userID,
            userName:userName 
        }, 
        accessTokenSecret,
        { expiresIn: '3600s' }
    );
    res.status(201).json({token: accessToken});
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader= String(req.headers['authorization']);
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).send();
    return jwt.verify(token, accessTokenSecret,(err, user) =>{
        if(err) return res.status(403).send();
        req.user = user;
        return next();
    });
};