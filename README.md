# Test-Bank

---

### Related Technologies

- Typescript
- Hapi
- Swagger
- Typeorm
- Joi
- Postgres
- Jest

### About

Test api about a test bank.

For now there are just CRUDs and basic features about account and bank management.

### You need to run the project

- [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Docker Compose](https://linuxize.com/post/how-to-install-and-use-docker-compose-on-ubuntu-18-04/)
- An IDE, I recommend [Visual Studio Code](https://code.visualstudio.com/)

### Running the application

After installing all the prerequisites

1. Import the project using your favorite IDE
2. Download all dependencies with yarn or npm
3. After you'll need to up the docker image with postgres, then tip the following command

```sh
$ sudo docker-compose up -d
```

4. Run yarn start
5. You can check the endpoints on swagger.io

```
http://localhost:3000/documentation
```

6. You need to login to get an token

{{host}}/auth

```
{
    "username": "test-user",
    "password": "@changeme"
}
```

### I suggest that you download too

- Postman or Insomnia (Test endpoints)
- DBeaver (Manage database)

### dotenv example

NODE_ENV=local

DATABASE_HOST="localhost"
DATABASE_PORT=5454
DATABASE_USERNAME="postgres"
DATABASE_PASSWORD="@changeme"
DATABASE_NAME="postgres"

JWT_AUDIT="aud:test-bank"
JWT_ISSUER="issuer:test-bank"
JWT_SECRET="your-secret"
JWT_VALID_IN_SECONDS=14400

USER_MOCK_USERNAME="test-user"
USER_MOCK_PASSWORD="@changeme"
USER_MOCK_EMAIL="test-user@test.com"
