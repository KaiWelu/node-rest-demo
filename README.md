## About

This is a Node.js REST API demo project to explore concepts like authentication, salting, controllers, schemas, session tokens, routing, middleware and restful APIs. Features include creating, updating, deleting and authenticating users.

### Tech used

- [Node](https://nodejs.org/docs/latest/api/)
- [Express](https://expressjs.com/en/4x/api.html)
- [Mongoose](https://mongoosejs.com/docs/)
- [Lodash](https://lodash.com/docs/4.17.15)

### How to run

Setup an .env file like this:

```bash
SECRET = [YOUR_SECRET]
MONGO_URL = [YOUR_MONGODB_URL]
```

You can run the api locally with:

```bash
npm run start
```

### Routes

POST /auth/register

```bash
{
    "email": "second@second1.com",
    "password": "1234",
    "username": "Caesar"
}
```

POST /auth/login

```bash
{
    "email": "second@second1.com",
    "password": "1234",
    "username": "Caesar"
}
```

GET /users (gets all users but you have to be logged in)

DEL /users/:id (deletes your user but you have to be logged in)

PATCH /users/:id

```bash
{
    "username": "Quintus"
}
```
