# Web3 Signature and Authorization Testing Stand

This project is a test stand for testing signatures and authorization via Web3 using NFID and Internet Computer Protocol (ICP).

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Docker Configuration](#docker-configuration)
  - [Dockerfile](#dockerfile)
  - [docker-compose.yml](#docker-composeyml)
- [Contact](#contact)

## Description

This project provides a platform for testing signatures and authorizations for Web3 applications using NFID and ICP. It includes tools and scripts to facilitate the deployment and interaction with smart contracts.

## Getting Started

Follow these instructions to set up and run the project on your local machine using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Ensure your Docker daemon is running.

## Running the Project

Build and start the Docker containers:

```bash
docker-compose up --build -d
```

The application should now be running and accessible on port 3000. Open your web browser and navigate to:

```arduino
http://localhost:3000
```

If you need to stop the containers, you can use:

```bash
docker-compose down
```

## Docker Configuration

### Dockerfile

```dockerfile
FROM node:19-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm i

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
```

### docker-compose.yml

```yaml
version: "3.8"

services:
  nextjs-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    working_dir: /app/src/frontend
    command: >
      sh -c "npm install &&
             npm run build &&
             npm run start"
```
