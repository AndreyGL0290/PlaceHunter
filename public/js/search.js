const R = 6371
const r = 10
const milesRate = 0.621371

const button = document.getElementById('near-me')
button.addEventListener('click', (e) => {
    e.preventDefault()
    navigator.geolocation.getCurrentPosition(success, error)
})

// We can retrieve results inside bounding box with following request
// GET /api/0.6/map?bbox=left,bottom,right,top

const success = async (geoPos) => {
    const lat = geoPos.coords.latitude;
    const lon = geoPos.coords.longitude;

    const C = 2 * Math.PI * R
    const dy = 360 * r / C;
    const dx = dy * Math.cos(lat*Math.PI/180);
    let customBbox = [lat-dy, lon-dx, lat+dy, lon+dx];

    let res = await graphqlQuery(`
    {
        location(lat: ${lat}, lon: ${lon}) {
            boundingbox
        }
    }
    `)

    let bbox = res.data.location.boundingbox
    bbox = [bbox[0], bbox[2], bbox[1], bbox[3]]

    let dest = document.getElementById('dest').value
    console.log(typeof dest, dest)
    
    res = await graphqlQuery(`
    {
        places(x1: ${customBbox[1]}, y1: ${customBbox[0]}, x2: ${customBbox[3]}, y2: ${customBbox[2]}, dest: "${dest}") {
            display_name
        }
    }
    `)
    console.log(res.data.places)

    let resultContainer = document.getElementById('result-container')
    for (let i in res.data.places) {
        let ul = document.createElement('ul')
        ul.innerText = res.data.places[i].display_name
        resultContainer.appendChild(ul)
    }
};

const error = (err) => {
    console.log(err)
};

const graphqlQuery = async (query) => {
    return (await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    })).json()
}