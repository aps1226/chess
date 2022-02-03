import { IResolvers } from '@graphql-tools/utils';
import { MutationRegisterArgs, QueryLoginArgs, User } from '../generated/generated';

const users:User[] = [];

export const UserResolvers: IResolvers = {
    Query:{
        login(_:void, args: QueryLoginArgs):Boolean{
            const userExists = users.filter((user:User) =>{
                return (
                    user.userName === args.userName &&
                    user.email === args.email &&
                    user.password === args.password
                )
            })[0];
            return !!userExists;
        }
    },
    Mutation: {
        register (_:void, args: MutationRegisterArgs): User{
            const newUser = {
                'userName': args.userName,
                'email':args.email,
                'password':args.password
            };
            users.push(newUser);
            return {
                ...newUser
            }
        }
    }
}