import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

import { error, success } from "../../utils/geoPos"
import { PlacesList } from "../../components/PlaceCard"
import { placeOSM } from "../../types/global"

export default function Places() {
    let init: placeOSM[] = []
    let [data, updateData] = useState(init)
    let { user } = useUser()
    return (
        <div>
            <div className='h-80 flex flex-col justify-center items-center'>
                <input className="w-1/2 mb-4 text-center bg-[#f3ebe8] rounded-lg border-solid border-[2px] border-black placeholder:text-center placeholder:text-black"
                    id='search-input'
                    placeholder="What are You looking for?"
                    onFocus={e => {e.currentTarget.placeholder = ''}}
                    onBlur={e => {e.currentTarget.placeholder = 'What are You looking for?'}}
                    onClick={e => {e.preventDefault(); if (!user) location.href='api/auth/login';}}/>
                <button className="px-[10%] py-1 rounded-lg bg-beige-200 transition ease-in-out hover:bg-beige-100 hover:scale-105" onClick={(e) => {
                    e.preventDefault();
                    document.getElementsByTagName('input')[0].value && navigator.geolocation.getCurrentPosition(async geoPos => {await success(geoPos, updateData)}, err => error(err));
                }}>Search</button>
            </div>
            <div className='grid grid-cols-2 mb-20 gap-x-[5%] gap-y-24 mx-10 phone:grid-cols-1 tablet:grid-cols-1'>
                <PlacesList places={data}/>
            </div>
        </div>
    )
}