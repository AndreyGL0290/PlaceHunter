const R = 6371
const r = 10
const milesRate = 0.621371

const inputField = document.getElementById('search-input');
inputField.addEventListener('focusin', e => e.currentTarget.placeholder='')
inputField.addEventListener('focusout', e => e.currentTarget.placeholder = 'What are You looking for?')

const button = document.getElementById('search')
button.addEventListener('click', (e) => {
    e.preventDefault()
    if (inputField.value) navigator.geolocation.getCurrentPosition(success, error);
})

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

    let dest = document.getElementById('search-input').value
    console.log(typeof dest, dest)
    
    res = await graphqlQuery(`
    {
        places(x1: ${customBbox[1]}, y1: ${customBbox[0]}, x2: ${customBbox[3]}, y2: ${customBbox[2]}, dest: "${dest}") {
            display_name
            icon
        }
    }
    `);

    let resultContainer = document.getElementById('result-box');
    resultContainer.innerHTML = '';
    for (let i in res.data.places) {
        PlaceCard(res.data.places[i], resultContainer)
    }
};

const error = (err) => {
    alert('An geolocation error occurred')
    console.log(err)
};

const graphqlQuery = async (query) => {
    return (await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    })).json()
}

const PlaceCard = (place, root) => {
    let card = document.createElement('div');
    card.className = 'h-80 flex flex-row justify-evenly rounded-xl bg-beige-100';
    let imageContainer = document.createElement('div');
    imageContainer.className = 'flex justify-center items-center';
    let imagebg2 = document.createElement('div');
    imagebg2.className = 'h-5/6 w-36 bg-martinique-950 ml-5';
    let imagebg = document.createElement('div');
    imagebg.className = 'w-full h-full flex justify-center items-center relative left-2 bottom-2 bg-tabasco-300';
    let image = document.createElement('img');
    image.className = 'h-40 w-40';
    let contentContainer = document.createElement('div');
    contentContainer.className = 'h-full w-3/4 flex flex-col justify-evenly items-center text-justify mx-5';
    let address = document.createElement('p');
    address.className = 'font-mono text-slate-900';

    address.textContent = place.display_name;
    contentContainer.appendChild(address);

    image.src = place.icon;
    imagebg.appendChild(image);
    imagebg2.appendChild(imagebg);
    imageContainer.appendChild(imagebg2);

    card.appendChild(imageContainer);
    card.appendChild(contentContainer);

    root.appendChild(card);
}