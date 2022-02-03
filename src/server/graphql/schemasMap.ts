import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { join } from 'path'
import resolvers from './resolversMap';

const schema = loadSchemaSync(
    [
        join(__dirname,'./schemas/users.graphql'),
    ],
    {
        loaders: [new GraphQLFileLoader()]
    }
);

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers
});

export default schema;