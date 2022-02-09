import express, { Application, RequestHandler } from 'express';
import userController from '../SQL/usersController';

module.exports = (app:Application) =>{

    const router = express.Router();

    const db = app.locals['db'];
    
    // Get all users.
    router.get('/',
    userController.allUsers(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(200);
        res.send(result);
    });

    // Find user based on userName.
    router.get('/find',
    userController.findUser(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(200);
        res.send(result);
    });

    // Add new user.
    router.post('/register',
    userController.newUser(db),
    userController.findUser(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(201);
        res.send(result);
    });

    // Update a field for an existing user.
    router.patch('/',
    userController.findUser(db),
    userController.updateUser(db),
    userController.findUser(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(201);
        res.send(result);
    });

    // Delete a respective user.
    router.delete('/',
    userController.findUser(db),
    userController.deleteUser(db),
    (req,res) =>{
        const result = JSON.stringify(res["locals"]["queryResult"])
        res.status(204);
        res.send(result);
    });

    return router;
};