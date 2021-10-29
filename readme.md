# Cortito

An open source URL Shortener.

## API

### `POST /`

> https://cortito.herokuapp.com

It receives an URL in string format:

Example URL: "https://stackoverflow.com/questions/43054195"

Example of POST using `curl`:

```sh
curl -X POST -H "Content-Type: text/plain" --data "https://stackoverflow.com/questions/43054195" https://cortito.herokuapp.com
```

If all the process is successful, it will return a response like:

```json
{
  "message": "Link \"https://stackoverflow.com/questions/43054195\" posted successfully.",
  "url": "https://stackoverflow.com/questions/43054195",
  "shortLink": "https://cortito.herokuapp.com/617c2d647be17711a9ddfa57"
}
```

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
docker build . -t ultirequiem/cortito
```

Run the image:

```sh
docker run -p 8080:8080 -d ultirequiem/cortito
```

> Independent of the method, now it should be running on http://localhost:8080

## Licence

This project is licensed under the [MIT Licence](./license).
