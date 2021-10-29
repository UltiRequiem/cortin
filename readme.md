# Cortito

An open source URL Shortener.

## API

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
  ├─ middlewares/
  ├─ models/
  ├─ routes/
  ├─ schemas/
  ├─ config.js
  ├─ utils.js
  └─ index.js
```

## Deploy

Check out [`.env-example`](./.env-example) and change it with your own data,
then rename it to `.env`.

### With Node.js and Yarn

You can use `npm` instead of [`yarn`](https://github.com/yarnpkg/berry), but I
encourage you to use `yarn`.

First build the frontend:

```sh
yarn frontend
```

The start the server:

```sh
yarn start
```

### With Docker

Build the image:

```sh
docker build . -t ultirequiem/cortito
```

Run:

```sh
docker run -p 8080:8080 -d ultirequiem/cortito
```

> Independent of the method, now it should be running on http://localhost:8080

## Licence

This project is licensed under the [MIT Licence](./license).
