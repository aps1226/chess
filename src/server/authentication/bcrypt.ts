import bcrypt from 'bcryptjs';

export const hash = (password: string) => {
    return new Promise((resolve, reject) => {
        const saltRounds = Number(process.env['SALT_ROUNDS']);
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
