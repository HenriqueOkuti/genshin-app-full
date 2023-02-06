# Genshin Task Manager

<div align='center'>
    <img src='./app images/login.png' alt='login sample' height='350px'/>
</div>

## About

<p>Genshin Task Manager is a Task Management App for players of Genshin Impact. Here you'll be able to track your character progression (talents, level, friendship and constellation) alongside the ability to plan your tasks in advange. Currently you are able to create task lists for Dungeon, Boss, Weekly Boss and Enemy materials, alongside local specialties, as long as there is a character using those materials.</p>

<<<<<<< HEAD
<div style='display: flex; '>
    <img src='./app images/homepage.png' alt='homepage sample' width='45%'/>
    <img src='./app images/characters.png' alt='characters sample' width='45%'/>
=======
<div style='display: flex;' align='center' >
    <img src='./app images/homepage.png' alt='homepage sample' width='40%'/>
    <img src='./app images/characters.png' alt='characters sample' width='40%'/>
>>>>>>> 651ba7cb88d709fd48f6c15ae0a56d75d6dd3f62
</div>

## How to run

### Docker

If you have access to docker compose, you can simply run it by using

```bash
docker-compose up --build
```

### Node

Alternatively you can run the front and back end separately via npm scripts, just like the docker-compose option, should already provide a seeded database with the characters and materials from the game.

After providing the necessary information to create your own .env, following the .env.example, you can proceed with the scripts.

For the front-end you'll need to run inside the frontend folder

```bash
    npm i && npm run start
```

For the back-end you'll need to run inside the node folder

```bash
    npm i && npm run dev:migrate
```