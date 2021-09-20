# Circle
This repo contains the source code and configuration files for Circle, the proof of concept for the "socialized architecture". Our goal is to study the feasibility of the "socialized architecture".

## To try the system
For trying out the system, with demonstrative purposes, follow the next steps
### Prerequisites
- A working Docker installation over Linux
- A GraphQL client, for instance [Insomnia](https://insomnia.rest/) (optional)

### Process
1. Wake up (at least) one instance of each service. It could be that other users are executing some of them, but it cannot be guaranteed
```bash
docker run pitazzo/circle:users-service
docker run pitazzo/circle:content-service
docker run pitazzo/circle:notifications-service
```
2. Try an initial request to http://frozen-plateau-06813.herokuapp.com/graphql for waking up the Heroku API *Gateway* instance. This request will fail.
3. Wait for 20 seconds
4. Proceed with the system proofs

## Local build
In the following, it is detailed the process to create the local containers that make up the system. Then, the system can be tested by using a *gateway* and an own database.

### Prerequisites
- An accesible PostgreSQL database
- RabbitMQ. It is recommended [CloudAMQP](https://www.cloudamqp.com/)
- SMTP service for sending *emails*. It is recommended [Ethereal](https://ethereal.email/) to avoid a large number of innecesary emails
- A working Docker installation over Linux
- A GraphQL client, for instance [Insomnia](https://insomnia.rest/) (optional)

### Process
1. Clone this repo
2. Create a file  ```.env```, in the repository root, with the following content
```
DB_HOST= <SUSTITUIR>
DB_PORT= <SUSTITUIR>
DB_USER= <SUSTITUIR>
DB_PASSWORD= <SUSTITUIR>
DB_DATABASE= <SUSTITUIR>
MAIL_HOST= <SUSTITUIR>
MAIL_PORT= <SUSTITUIR>
MAIL_USER= <SUSTITUIR>
MAIL_PASSWORD= <SUSTITUIR>
```
3. Execute **from the root directory of the repo** the commands to construct the containers
```
docker build -t circle/gateway-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f gateway-service/Dockerfile .
docker build -t circle/users-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f users-service/Dockerfile .
docker build -t circle/content-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f content-service/Dockerfile .
docker build -t circle/notifications-service $(for i in `cat .env`; do out+="--build-arg $i " ; done; echo $out;out="") -f notifications-service/Dockerfile .
```
4. Wake up the containers (at least one instance of each container, but the *gatewat*, only one instance of the latter must be in execution)
```bash
docker run circle/gateway-service -p 3000:3000
docker run circle/users-service
docker run circle/content-service
docker run circle/notifications-service
```

5. Proceed in http://localhost:3000/graphql
