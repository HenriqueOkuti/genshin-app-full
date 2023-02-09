# Genshin Task Manager

<div align='center'>
    <img width='50%' src='./readme-assets/Landing Page.png' alt='Landing page' />
</div>

## About

<p>Genshin Task Manager is a Task Management App for players of Genshin Impact. Here you'll be able to track your character progression (talents, level, friendship and constellation) alongside the ability to plan your tasks in advance. Currently you are able to create task lists for Dungeon, Boss, Weekly Boss and Enemy materials, alongside local specialties, as long as there is a character using those materials.</p>

## How to run

The only essential environment variable for the front-end is the REACT_APP_API_BASE_URL, which should point towards the api URL. However, to run this app with the OAuth features you'll need to fill the rest of the .env file inside the `./frontend` folder, following the `.env.example`, otherwise you'll be limited to run it with the default sign up and login options. For the back-end however, you'll need to fill the .env file following the .env.example inside the node folder.

### Docker

If you have access to docker compose, you can simply run it by using

```bash
docker-compose up --build
```

By default, the `PORT` used by the application is `PORT=8500`, so refer to `http://localhost:8500/` to use the application. If your port 8500 is already being used (and you don't want to kill the application that's using it), you can alter the PORT by altering:

<ul>
    <li>nginx/nginx.conf -> listen NEW_PORT</li>
    <li>node/.env.development -> REDIRECT_URL following .env.example</li>
    <li>frontend/.env -> REACT_APP_API_BASE_URL following .env.example</li>
    <li>frontend/.env -> REACT_APP_REDIRECT_URL following .env.example</li>
</ul>

### Node

Alternatively you can run the front via npm scripts. For the front-end, just use the following commands inside the frontend folder

```bash
    npm i && npm run start
```

For the Back-end, just use the following commands inside the node folder

```bash
    npm i && npm run dev:migrate
```

Do note that a .env.development is required.

## Application Features

### Registration

You can sign up to the application via Google or Github, or using manual registration

### Today's Tasks

When logging into the service (or by clicking Home) you can see the tasks that can be done "Today", which is filtered from all of the user tasks and as long as it includes "Today", it should be shown.

Due to how the game works, some items can be farmed any day of the week, and some can be obtained only on specific days. Should your task include some item that can only be obtained from a specific day, It'll be shown as a task that can be done on X day instead of "Any".

<div style='display: flex;' align='center'>
    <img width='45%' src='./readme-assets/Home Page.png' alt='Home page' />
    <img width='45%' src='./readme-assets/Home Page Alt.png' alt='Alt Home page' />
</div>

### Character Tracking

Your characters are displayed on the characters tab, and you can add a new character by clicking on the plus buttom. You can also filter your own characters by: Alphabetical order, element, weapon, level, friendship and number of constellations.

<div style='display: flex;' align='center'>
    <img width='45%' src='./readme-assets/Add Characters Page.png' alt='Characters page' />
    <img width='45%' src='./readme-assets/Add Characters Page Filtered.png' alt='Characters page filtered' />
</div>

When adding/editing characters, you can alter the values for the talents (normal, skill and burst) from 0 to 10, since those are the default values you can alter inside the game. The level can be altered from 1 to 90, the friendship from 1 to 10 and constellations from 0 to 6.

<div style='display: flex;' align='center'>
    <img width='45%' src='./readme-assets/Adding Yun Jin Page.png' alt='Adding character page' />
</div>

### Tasks Tracking

On the tasks page you'll be able to see every task you created. You can filter it by alphabetical order, date of creation and last update. You can add a new task by clicking on the plus buttom.

<div style='display: flex;' align='center'>
    <img width='45%' src='./readme-assets/Tasks Page.png' alt='Tasks page' />
</div>

When adding/editing a task you must include a name for the task and an image for it. When you click on the plus buttom inside this screen, It'll open a modal to add a new item. Inside this item modal you can filter the items by: Alphabetical order, Weekly Boss items, Boss Items, Dungeon Materials, Local Specialties and Enemy Materials. Naturally, if you include Dungeon Materials inside your task, It'll be considered a task that can only be done on X day.

<div style='display: flex;' align='center'>
    <img width='45%' src='./readme-assets/Task Items Modal.png' alt='Task Items page' />
    <img width='45%' src='./readme-assets/Add Task Page.png' alt='Add Task page' />
</div>
