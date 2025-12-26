## Development

### Build

To prepare the project for running in development phase, you must use the following commands in the backend:
```bash
npm install
npx playwright install
```

And for the frontend:
```bash
npm install
```

### Run

For running it, use the following command in the backend:
```bash
npm start
```

And for the frontend:
```bash
npm run dev
```

The *port 5173* is configured as the default port for the frontend, which fetchs the data from the *port 3000* of the backend.