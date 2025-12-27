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

#### Build

To prepare the project for running in development phase, you must use the following commands in the backend:
```bash
npm install
npx playwright install
```

And for the frontend:
```bash
npm install
```

#### Run

For running it, use the following command in the backend:
```bash
npm start
```

And for the frontend:
```bash
npm run dev
```

The *port 3001* is configured as the default port for the frontend, which fetchs the data from the *port 3000* of the backend.

## Galley

List of scraped news:
![News list](images/news_list.png)

Keywords cloud of the scraped news:
![Keywords cloud](images/keywords_cloud.png)