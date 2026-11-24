# Docker Complete Guide – Node.js Project

This README contains basic Docker commands and instructions to build, run, manage, and deploy a Node.js application using Docker.

## 1. Docker Installation

Check Docker version:

```bash
docker --version
```

Check Docker information:

```bash
docker info
```

Check Docker Compose:

```bash
docker compose version
```

Start Docker:

```bash
sudo systemctl start docker
```

Check Docker service:

```bash
sudo systemctl status docker
```

Enable Docker on startup:

```bash
sudo systemctl enable docker
```

## 2. Create Node.js Project

```bash
mkdir docker-node-project
cd docker-node-project
npm init -y
npm install express
touch app.js
touch Dockerfile
touch README.md
touch .dockerignore
```

## 3. Node.js Application (app.js)

```javascript
const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Hello! Node.js app running inside Docker"
    });
});

app.get("/users", (req, res) => {
    res.json({
        message: "Users API working successfully"
    });
});

app.listen(4000, "0.0.0.0", () => {
    console.log("Server running on port 4000");
});
```

Test locally:

```bash
node app.js
```

API URL: http://localhost:4000

## 4. Dockerfile

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]
```

### Dockerfile Commands

- FROM: Selects base image.
- WORKDIR: Sets working directory.
- COPY: Copies files into image.
- RUN: Executes commands during image building.
- EXPOSE: Documents application port.
- CMD: Starts the application.

## 5. .dockerignore

```text
node_modules
npm-debug.log
.git
.env
```

## 6. Build Docker Image

Build image:

```bash
docker build -t my-node-app .
```

Build without cache:

```bash
docker build --no-cache -t my-node-app .
```

Build with another tag:

```bash
docker build -t my-node-app:v1 .
```

Check images:

```bash
docker images
```

## 7. Run Docker Container

Run application in background:

```bash
docker run -d -p 4000:4000 --name my-api my-node-app
```

Run in foreground:

```bash
docker run -p 4000:4000 my-node-app
```

Run with another host port:

```bash
docker run -d -p 5000:4000 --name my-api-2 my-node-app
```

## 8. Container Management

Show running containers:

```bash
docker ps
```

Show all containers:

```bash
docker ps -a
```

Show container IDs:

```bash
docker ps -q
```

Stop container:

```bash
docker stop my-api
```

Start container:

```bash
docker start my-api
```

Restart container:

```bash
docker restart my-api
```

Pause container:

```bash
docker pause my-api
```

Unpause container:

```bash
docker unpause my-api
```

## 9. Docker Logs

Show logs:

```bash
docker logs my-api
```

Show last 50 lines:

```bash
docker logs --tail 50 my-api
```

Follow live logs:

```bash
docker logs -f my-api
```

## 10. Enter Container

Enter using Bash:

```bash
docker exec -it my-api bash
```

Enter using Shell:

```bash
docker exec -it my-api sh
```

Exit:

```bash
exit
```

## 11. Remove Containers

Remove stopped container:

```bash
docker rm my-api
```

Force remove container:

```bash
docker rm -f my-api
```

Remove all stopped containers:

```bash
docker container prune
```

## 12. Remove Images

Remove image:

```bash
docker rmi my-node-app
```

Force remove image:

```bash
docker rmi -f my-node-app
```

Remove unused images:

```bash
docker image prune
```

Remove all unused images:

```bash
docker image prune -a
```

## 13. Docker Volumes

Create volume:

```bash
docker volume create my-data
```

List volumes:

```bash
docker volume ls
```

Inspect volume:

```bash
docker volume inspect my-data
```

Remove volume:

```bash
docker volume rm my-data
```

## 14. Docker Networks

List networks:

```bash
docker network ls
```

Create network:

```bash
docker network create my-network
```

Connect container:

```bash
docker network connect my-network my-api
```

Disconnect container:

```bash
docker network disconnect my-network my-api
```

Remove network:

```bash
docker network rm my-network
```

## 15. Docker Compose

Start services:

```bash
docker compose up
```

Start in background:

```bash
docker compose up -d
```

Build and start:

```bash
docker compose up --build -d
```

Stop services:

```bash
docker compose stop
```

Stop and remove containers:

```bash
docker compose down
```

Show services:

```bash
docker compose ps
```

Show logs:

```bash
docker compose logs
```

## 16. Useful Docker Commands

```bash
docker inspect my-api
docker stats
docker top my-api
docker port my-api
docker system df
docker system prune
docker version
```

Copy file into container:

```bash
docker cp file.txt my-api:/app/
```

## 17. Test API

Open browser:

```text
http://localhost:4000
http://localhost:4000/users
```

Or use curl:

```bash
curl http://localhost:4000
curl http://localhost:4000/users
```

## 18. Important Docker Concepts

| Concept | Description |
|---|---|
| Dockerfile | Instructions to build an image |
| Image | Package containing application and dependencies |
| Container | Running instance of an image |
| Volume | Persistent data storage |
| Network | Communication between containers |
| Docker Compose | Manages multiple services |
| Docker Hub | Online Docker image repository |

## 19. Complete Docker Workflow

```bash
# 1. Create project
mkdir docker-node-project
cd docker-node-project

# 2. Initialize Node.js
npm init -y
npm install express

# 3. Create files
touch app.js Dockerfile .dockerignore README.md

# 4. Build image
docker build -t my-node-app .

# 5. Check images
docker images

# 6. Run container
docker run -d -p 4000:4000 --name my-api my-node-app

# 7. Check containers
docker ps

# 8. Check logs
docker logs my-api

# 9. Stop container
docker stop my-api

# 10. Start container again
docker start my-api

# 11. Remove container
docker rm -f my-api
```

**Note:** If a container with the same name already exists, remove it before creating another container with that name. Removing a container does not automatically remove its image.

---

Happy Learning! 🚀
