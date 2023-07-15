# PlaceHunter
Small project made to improve my frontend and backend skills.
It has two instances this on is done using tools described in techstack

## What it does
This project uses OSM API to find all kind of things around you. _(radius is 50km and cannot be changed explicitly)_

Also an autharization system is realized with support of Auth0 API but for now its kinda pointless.
In future it might be used for statistics collection and it further visualization using d3.js

## Techstack
### JS Frameworks and Extensions
- Express.JS
- TypeScript

### Template Language
- JS Embedded

### Style
- TailwindCSS

### API's
- Auth0 API
- OSM API
- Geolocation API

### Database
- MongoDB

## How to use
In order to use this application you'll nead to create an **Auth0 account**.
Then you'll have to setup a project and finally add up following properties to **.env file**:
* **CLIENT_ID**: `string` - Value of "Client ID" field in project settings
* **ISSUER_BASE_URL**: `string` - Value of "Domain" field in project settings
* **SECRET**: `string` - Value of "Client Secret" field in project settings

Additionally you'll need to specify a **PORT**: `number` variable in your .env file.
This value represents port on which your local server will be running.