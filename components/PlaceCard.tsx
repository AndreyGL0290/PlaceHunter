import { placeOSM } from "../types/global"

export function Place ({ place }: { place: placeOSM }){
    return (
        <div className="h-80 flex flex-row justify-evenly rounded-xl bg-beige-100 ">
            <div className="flex justify-center items-center">
                <div className="h-5/6 w-36 flex justify-center items-center bg-martinique-950">
                    <img src={place.icon} alt={"Image of\n" + place.type} className="h-40 w-40 "/>
                </div>
            </div>
            <div className="h-full w-3/4 flex flex-col justify-evenly items-center text-justify mx-5">
                <p className="font-mono text-slate-900">{place.display_name}</p>
                <button className="px-20 py-2 rounded-lg bg-beige-200 transition ease-in-out hover:bg-beige-300 hover:scale-105">More</button>
            </div>
        </div>    
    )
}

export function PlacesList({ places }: { places: placeOSM[] }) {
    return (
        <>
            {places.map(place => (
                <Place place={place} key={place.display_name}/>
            ))}
        </>
    )
}