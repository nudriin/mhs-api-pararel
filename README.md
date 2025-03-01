# API Documentation

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Deploying to Ubuntu Server](#deploying-to-ubuntu-server)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

---

## Introduction
This is a backend API built with Node.js and Express. It uses MySQL as the database and runs inside a Docker container for easy deployment.

## Features
- RESTful API with Express.js
- MySQL database integration
- Docker support for containerized deployment
- Environment variables for configuration

## Installation

### Prerequisites
- Node.js (v16 or later)
- Docker & Docker Compose
- MySQL (if not using Docker for DB)
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/nudriin/mhs-api-pararel.git
   cd mhs-api-pararel
   ```
2. Create a `.env` file and configure it:
   ```env
   SECRET_KEY=yourjwtsecret
   DB_HOST=db
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=yourdatabase
   PORT=5000
   ```
3. Build and start the application using Docker:
   ```bash
   docker-compose up -d --build
   ```
4. Verify the containers are running:
   ```bash
   docker ps
   ```

## Running the Application
If running without Docker:
```bash
npm install
npm start
```

## Deploying to Ubuntu Server

### Step 1: Update & Install Dependencies
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose git
```

### Step 2: Clone the Repository
```bash
git clone https://github.com/nudriin/mhs-api-pararel.git
cd mhs-api-pararel
```

### Step 3: Configure Environment Variables
```bash
nano .env
```
(Add your database credentials inside the `.env` file)

### Step 4: Run Docker Compose
```bash
docker-compose up -d --build
```

### Step 5: Verify API is Running
```bash
curl -X POST http://localhost:5000/login
```

If running on a remote server, replace `localhost` with your server's public IP.

## API Endpoints
| Method |     Endpoint    |                       Description                        |            Headers            |
|--------|-----------------|----------------------------------------------------------|-------------------------------|
| GET    | `/mahasiswa`    | Get all student data                                     | Authorization: Bearer <token> |
| POST   | `/login`        | Get your token (no need request body)                    |                               |
| POST   | `/mahasiswa`    | Add student (request: {nama: "name", nim: "19"} )        | Authorization: Bearer <token> |
| PUT    | `/mahasiswa/:id`| Update student (request: {nama: "new name", nim: "new"}) | Authorization: Bearer <token> |
| DELETE | `/mahasiswa/:id`| Remove student                                           | Authorization: Bearer <token> |
 
## Troubleshooting
If MySQL does not connect:
```bash
docker logs <container_id>
```
If API is not reachable:
```bash
docker ps -a
```
Ensure the server allows incoming connections:
```bash
sudo ufw allow 5000/tcp
```

