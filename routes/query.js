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
    GraphQLNonNull,
    GraphQLFloat
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

const address = new GraphQLObjectType({
    name: 'address',
    description: 'User address',
    fields: () => ({
        house_number: { type: GraphQLString },
        road: { type: GraphQLString },
        postcode: { type: GraphQLString },
        neighbourhood: { type: GraphQLString },
        suburb: { type: GraphQLString },
        city: { type: GraphQLString },
        county: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString }
    })
})

const location = new GraphQLObjectType({
    name: 'location',
    discription: "Contains information about user's current location",
    fields: () => ({
        address: { type: address },
        boundingbox: { type: new GraphQLList(GraphQLFloat) }
    })
})

const place = new GraphQLObjectType({
    name: 'Place',
    description: 'Place that is near to user location',
    fields: () => ({
        display_name: { type: GraphQLString },
        class: { type: GraphQLString },
        type: { type: GraphQLString },
        icon: { type: GraphQLString },
        lon: { type: GraphQLFloat },
        lat: { type: GraphQLFloat }
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
        },
        location: {
            type: location,
            args: {
                lat: { type: GraphQLFloat },
                lon: { type: GraphQLFloat }
            },
            resolve: async (parent, coords) => {
                let data = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lon}&format=json`)
                data = await data.json()
                return data
            }
        },
        places: {
            type: new GraphQLList(place),
            args: {
                x1: { type: GraphQLFloat },
                y1: { type: GraphQLFloat },
                x2: { type: GraphQLFloat },
                y2: { type: GraphQLFloat },
                dest: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                console.log(args)
                let data = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${args.dest}&viewbox=${args.x1}%2C${args.y1}%2C${args.x2}%2C${args.y2}&bounded=1&format=json`)
                data = await data.json()
                return data
            }
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