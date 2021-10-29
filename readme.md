# Cortito

An URL Shorter

## Deploy

First build the frontend assets:

```sh
yarn frontend
```

The run:

```sh
yarn start
```

### With Docker

Build:

```sh
docker build . -t ultirequiem/cortito
```

Run:

```sh
docker run -p 8080:8080 -d ultirequiem/cortito
```

Now it should be running on http://localhost:8080

## Licence

This project is licensed under the [MIT Licence](./license).
