let select = document.getElementsByTagName('select')[0]
let root = document.getElementById('tech-stack')

let stack1 = {'JS Frameworks and extnsion': ['Express.JS', 'TypScript'], 'Template Language': ['Embedded JS'], 'Style': ['TailwindCSS'], 'API\'s': ['Auth0 API', 'OSM API', 'Geolocation API'], 'Database': ['MongoDB']}
let stack2 = {'JS Frameworks and extnsion': ['Next.JS', 'React', 'TypScript'], 'Style': ['TailwindCSS'], 'API\'s': ['Auth0 API', 'OSM API', 'Geolocation API'], 'Database': ['MongoDB']}

select.addEventListener('change', e => {
    if (e.currentTarget.value == 1) {
        // Changing DOM for express
    } else {
        // Changing DOM for Next.JS
    }
})

const firstStack = () => {
    
}

const secondStack = () => {
    
}