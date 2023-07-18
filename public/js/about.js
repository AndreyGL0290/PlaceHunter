let select = document.getElementsByTagName('select')[0]
let root = document.getElementById('tech-stack')

let stack1 = {'JS Frameworks and Extnsion': ['Express.JS', 'TypeScript'], 'Template Language': ['Embedded JS'], 'Style': ['TailwindCSS'], 'API\'s': ['GraphQL', 'Auth0 API', 'OSM API', 'Geolocation API'], 'Database': ['MongoDB']}
let stack2 = {'JS Frameworks and Extnsion': ['Next.JS', 'React', 'TypeScript'], 'Style': ['TailwindCSS'], 'API\'s': ['Auth0 API', 'OSM API', 'Geolocation API'], 'Database': ['MongoDB']}

select.addEventListener('change', e => e.currentTarget.value == 1 ? buildStack(stack1) : buildStack(stack2))

const buildStack = (stack) => {
    root.innerHTML = '';
    for (const [key ,value] of Object.entries(stack)) {
        let div = document.createElement('div');
        
        let h = document.createElement('h1');
        h.className = 'techstack-header';
        h.textContent = key;
        div.appendChild(h);

        for (let item of value) {
            let p = document.createElement('p');
            p.className = 'techstack-item';
            p.textContent = item;
            div.appendChild(p);
        }

        root.appendChild(div);
    }
}