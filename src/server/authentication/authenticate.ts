import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const createToken = (req: Request, res: Response) =>{
    const {userName} = res["locals"]["queryResult"];
    const accessToken = jwt.sign(
        { userName:userName }, 
        String(process.env['ACCESS_TOKEN_SECRET']),
        { expiresIn: '3600s' }
    );
    res.status(201).json({token: accessToken});
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader= String(req.headers['authorization']);
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).send();
    return jwt.verify(token, String(process.env['ACCESS_TOKEN_SECRET']),(err, user) =>{
        if(err) return res.status(403).send();
        req.user = user;
        return next();
    });
}