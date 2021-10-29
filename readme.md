# cortin

An open source URL Shortener.

## Endpoints

### `GET /`

> https://cortin.herokuapp.com

The website.

### `POST /`

Example using `curl`:

```sh
curl -X POST -H "Content-Type: text/plain" --data "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" https://cortin.herokuapp.com
```

Example using the Javascript [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function:

```javascript
const rawResponse = await fetch('https://cortin.herokuapp.com', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
  },
  body: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
});

console.log(await rawResponse.json());
```

If the process is successful, it will return:

```json
{
  "message": "Link \"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch\" posted successfully.",
  "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
  "shortLink": "https://cortin.herokuapp.com/617c7a3db46fab786e957283"
}
```

By default this link is public, that means that it is listed in `GET /v1`,
if you don't like this check `POST /v1`.

### `POST /v1`

If you don't want your link to be listed in `GET /v1`, you can:

```js
const rawResponse = await fetch('https://cortin.herokuapp.com/v1', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://eslint.org/users',
    private: true,
  }),
});

console.log(await rawResponse.json());
```

This will return:

```
{
    "message": "Link \"https://eslint.org/users\" posted successfully.",
    "url": "https://eslint.org/users",
    "private": true,
    "shortLink": "https://cortin.herokuapp.com/617c7ef9d36584e5a265f7c7"
}
```

### `GET v1/`

> https://cortin.herokuapp.com/v1

Returns the list of all the public links.

```sh
curl https://cortin.herokuapp.com/v1
```

Example:

```json
[
  {
    "_id": "617c6dfcb46fab786e95727c",
    "url": "https://github.com/UltiRequiem/cortin",
    "__v": 0
  },
  {
    "_id": "617c7a3db46fab786e957283",
    "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
    "__v": 0
  }
]
```

### `GET v1/:id`

> https://cortin.herokuapp.com/v1/617c6dfcb46fab786e95727c

This will show information about the link.

```sh
curl https://cortin.herokuapp.com/v1/617c6dfcb46fab786e95727c
```

Will return:

```json
{
  "_id": "617c6dfcb46fab786e95727c",
  "url": "https://github.com/UltiRequiem/cortin",
  "__v": 0
}
```

### `GET /:id`

> https://cortin.herokuapp.com/617c6dfcb46fab786e95727c

It will redirect you to the previously configured site.

## Technologies Used

- [React.js](https://reactjs.org): Frontend
- [Express.js](https://expressjs.com): Server
- [MongoDB](https://www.mongodb.com): Persistence

Technically is the [MERN Stack](https://www.mongodb.com/mern-stack).

## Project layout

The structure of the project is quite simple:

```
├─ www/             The frontend
│ ├─ public/
│ └─ src/
│   ├─ components/
│   └─ index.js
└─ src/             The server
  ├─ middleware/
  ├─ handlers/
  ├─ models/
  ├─ routes/
  ├─ schemas/
  ├─ config.js
  ├─ utils.js
  └─ index.js
```

## Development

Start all the process:

```sh
yarn start
```

Start all the process but not the frontend:

```sh
yarn start:api
```

Live Reload API:

```
yarn dev
```

To work on the frontend, enter the [`www`](./www) directory and:

```sh
yarn dev
```

## Deploy

Check out [`.env-example`](./.env-example) and change it with your own data,
then rename it to `.env`.

### With Node.js and Yarn

You can use `npm` instead of [`yarn`](https://github.com/yarnpkg/berry), but I
[encourage you to use yarn](https://stackoverflow.com/questions/40027819).

```sh
yarn && yarn start
```

### With Docker

Build the image:

```sh
docker build . -t ultirequiem/cortin
```

Run the image:

```sh
docker run -p 8080:8080 -d ultirequiem/cortin
```

> Independent of the method, now it should be running on http://localhost:8080

## Licence

This project is licensed under the [MIT Licence](./license).
