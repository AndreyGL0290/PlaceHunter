import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import { placeOSM } from "../types/global";

export const success = async (geoPos: GeolocationPosition, updateData: Function, user: UserProfile) => {
    const R = 6371
    const r = 10
    // const milesRate = 0.621371
    const lat = geoPos.coords.latitude;
    const lon = geoPos.coords.longitude;
    
    const C = 2 * Math.PI * R;
    const dy = 360 * r / C;
    const dx = dy * Math.cos(lat*Math.PI/180);

    let customBbox = [lon-dy, lat-dx, lon+dy, lat+dx];

    let dest = document.getElementsByTagName('input')[0].value;

    // Saves query data to db
    let body = { place: dest, user: user }
    fetch('http://localhost:3000/api/saveQueryData', {method: 'POST', headers: {'Content-Tyepe': 'application/json'}, body: JSON.stringify(body)})

    let res: placeOSM = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${dest}&viewbox=${customBbox[0]}%2C${customBbox[1]}%2C${customBbox[2]}%2C${customBbox[3]}&bounded=1&format=json`).then( res => (res.json()));
    updateData(res)
};

export const error = (err: GeolocationPositionError) => {
    console.log(err)
    alert('Geolocation error')
};