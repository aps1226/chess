import bcrypt from 'bcryptjs';

const saltRounds = Number(process.env['NODE_ENV'] === 'production' ? process.env['PROD_SALT_ROUNDS'] : process.env['DEV_SALT_ROUNDS']);

export const hash = (password: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password,saltRounds,(err,hash) =>{
            if(err) return reject(err);
            return resolve(hash);
        })
    });
};

export const compare = (password: string, hash: string) =>{
    return new Promise((resolve,reject) =>{
        bcrypt.compare(password,hash, (err, res) =>{
            if(err) return reject(err);
            return resolve(res);
        });
    });
};
