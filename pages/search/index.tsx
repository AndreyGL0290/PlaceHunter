import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

import { error, success } from "../../utils/geoPos"
import { PlacesList } from "../../components/PlaceCard"
import { link, place } from "../../types/global"
import NavBar from '../../components/NavBar'

export default function Places() {
    let init: place[] = [
        // Sample data
        {icon: 'https://nominatim.openstreetmap.org/ui/mapicons/food_cafe.p.20.png', display_name: 'CBD cafe & Kava Bar, Old Saint Augustine Road, Jacksonville, Duval County, Florida, 32257, United States'},
        {icon: 'https://nominatim.openstreetmap.org/ui/mapicons/food_cafe.p.20.png', display_name: 'CBD cafe & Kava Bar, Old Saint Augustine Road, Jacksonville, Duval County, Florida, 32257, United States'},
        {icon: 'https://nominatim.openstreetmap.org/ui/mapicons/food_cafe.p.20.png', display_name: 'CBD cafe & Kava Bar, Old Saint Augustine Road, Jacksonville, Duval County, Florida, 32257, United States'},
        {icon: 'https://nominatim.openstreetmap.org/ui/mapicons/food_cafe.p.20.png', display_name: 'CBD cafe & Kava Bar, Old Saint Augustine Road, Jacksonville, Duval County, Florida, 32257, United States'},
        {icon: 'https://nominatim.openstreetmap.org/ui/mapicons/food_cafe.p.20.png', display_name: 'CBD cafe & Kava Bar, Old Saint Augustine Road, Jacksonville, Duval County, Florida, 32257, United States'},
    ]
    let [data, updateData] = useState(init)
    let { user, isLoading } = useUser()
    return (
        <>
            {/* <NavBar /> */}
        </>
    )
}