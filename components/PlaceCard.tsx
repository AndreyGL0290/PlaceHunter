import { place } from "../types/global"

export function Place ({ place }: { place: place}){
    return (
        <ul className="flex flex-col items-center border-slate-700 border-solid border-2 rounded-xl bg-slate-200">
            <img className="w-20 hover" src={place.icon} />
            <p className="font-mono text-slate-900">{place.display_name}</p>
        </ul>    
    )
}

export function PlacesList({ places }: { places: place[]}) {
    return (
        <>
            {places.map(place => (
                <Place place={place} key={place.display_name}/>
            ))}
        </>
    )
}