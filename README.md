# PlaceHunter
Small project made to improve my frontend and backend skills.
It has two instances this on is done using tools described in techstack

## What it does
This project uses OSM API to find all kind of things around you. _(radius is 50km and cannot be changed explicitly)_

Also an autharization system is realized with support of Auth0 API but for now its kinda pointless.
In future it might be used for statistics collection and it further visualization using d3.js

## Techstack
### JS Frameworks and Extensions
- Next.JS
- TypeScript

### Style
- TailwindCSS

### API's
- Auth0 API
- OSM API
- Geolocation API

### Database
- MongoDB

## Setup
In order to use this application you'll nead to create an **Auth0 account**.
Then you'll have to setup a project and finally add up following properties to **.env.local file**:
* **AUTH0_SECRET**: `string` - 32 byte string of random hexademical charachters[^1]
* **AUTH0_BASE_URL**: `string` - URL on which your application is running. If you are running this project on your machine it would be http://localhost:3000
* **AUTH0_ISSUER_BASE_URL**: `string` - Value of "Domain" field in project settings
* **AUTH0_CLIENT_ID**: `string` - Value of "Client ID" field in project settings
* **AUTH0_CLIENT_SECRET**: `string` - Value of "Client Secret" field in project settings

Additionally you'll need to specify a **MONGODB_URI**: `string` variable in your .env.local file.
It's value is address where your MongoDB server is running.

The last thing that you'll nead to specify is **DB**: `string` - name of your database.

## Footnotes
[^1]: You can create such a string using following command:
```
openssl rand -hex 32
```