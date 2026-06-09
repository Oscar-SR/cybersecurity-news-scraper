# Cybersecurity News Scraper

This project consists of an application that scrapes cybersecurity news from different open sources. It is composed of a frontend and a backend that communicate via REST API. The code structure of this project is modular, allowing new sources to be added and new functionalities to be integrated with minimal effort.

## Usage

### Docker

The easiest way to run the application is using Docker. First, copy environment template:

```bash
cp .env.example .env
```

Optionally, customize ports in `.env` file:

```
BACKEND_PORT=3000
FRONTEND_PORT=3001
```

Build and start containers:

```bash
docker compose up --build
```

The application will be available at:

- Backend: `http://localhost:3000` (or your configured `BACKEND_PORT`)
- Frontend: `http://localhost:3001` (or your configured `FRONTEND_PORT`)

To stop the containers:

```bash
docker compose down
```

### Manual setup

#### 1. Installation

To prepare the project for running, you must use the following commands in the root directory of the project:

```bash
npm install
npx playwright install
```

#### 2. Execution

For running in **development** phase, use the following command:

```bash
npm run dev
```

For **production**, you must first build the packages with this command:

```bash
npm run build
```

After that, you can run the application with the following command:

```bash
npm start
```

The _port 3001_ is configured as the default port for the frontend, which fetchs the data from the _port 3000_ of the backend.

## Gallery

List of scraped news:
![News list](images/news_list.png)

Keywords cloud of the scraped news:
![Keywords cloud](images/keywords_cloud.png)
