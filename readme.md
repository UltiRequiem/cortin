# cortin

An open source URL Shortener.

## API

### `POST /`

Example using `curl`:

```sh
curl -X POST -H "Content-Type: text/plain" --data "https://stackoverflow.com/questions/43054195" https://cortin.herokuapp.com
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

const content = await rawResponse.json();

console.log(content);
```

If all the process is successful, it will return a response like:

```json
{
  "message": "Link \"https://stackoverflow.com/questions/43054195\" posted successfully.",
  "url": "https://stackoverflow.com/questions/43054195",
  "shortLink": "https://cortin.herokuapp.com/617c6719b46fab786e957273"
}
```

By default this link is public, that mens that it is listed when `GET /v1`,
if you want make it private use `POST /v1`.

### `POST /v1`

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
