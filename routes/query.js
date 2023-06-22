const { users } = require('../mongoDB/config')
// Express.js
var router = require('express').Router()
// GraphQL
const { graphqlHTTP } = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull
} = require('graphql')

const user = new GraphQLObjectType({
    name: 'User',
    description: 'A single user data',
    fields: () => ({
        dbId: {
            description: 'Points to user records in database',
            type: GraphQLNonNull(GraphQLString),
            resolve: (dbid) => (dbid._id.toJSON())
        },

        userId: {
            description: 'An uid assigned to a user when they create an account',
            type: GraphQLNonNull(GraphQLString)
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            description: 'List of all users',
            type: new GraphQLList(user),
            resolve: async () => (await users.find({ }, { userId: 1, _id: 1 }).toArray())
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQuery
})

router.use('/', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

module.exports = router