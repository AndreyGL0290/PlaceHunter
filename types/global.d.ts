export type data = {
    users?: user[]
    location?: location
    places?: place[]
}

type user = {
    dbId: string
    userId: string
}

type location = {
    address?: address
    bouindingbox?: number[]
}

type address = {
    house_number: string
    road: string
    postcode: string
    neighbourhood: string
    suburb: string
    city: string
    county: string
    state: string
    country: string
}

type place = {
    display_name?: string
    class?: string
    type?: string
    icon?: string
    lon?: string
    lat?: string
}