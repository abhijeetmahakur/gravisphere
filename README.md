# GraviSphere

GraviSphere is an experimental gravity-control interface with a React/Vite frontend and an Express API. The backend currently connects to `mongodb-memory-server`, so its data is temporary and is lost when the process stops.

## Requirements

- Node.js and npm versions supported by the frontend dependencies
- A browser
- Internet access the first time the backend starts, if the MongoDB memory-server binary is not already cached

## Run locally

Start the API in one terminal:

```bash
cd backend
npm install
```

Set a private `JWT_SECRET` in that terminal, then start the API:

```bash
npm start
```

On PowerShell, set it for the current terminal with `$env:JWT_SECRET = '<local-random-value>'`. Do not commit real secrets. The API listens on port `5000` by default.

Start the frontend in another terminal:

```bash
cd frontend
npm ci
npm run dev
```

The Vite development server proxies `/api` requests to `http://127.0.0.1:5000`. Use the local URL printed by Vite.

## Checks

From `frontend/`, run `npm run lint` and `npm run build`. The backend package has no automated test script; the CI workflow checks JavaScript syntax only.

## Security and limitations

This is not ready for public deployment. The API currently permits open registration with a caller-selected role, and CORS is unrestricted. Fix those access controls, configure production secrets and a persistent database, and restrict CORS before exposing the service.

## License

No root project `LICENSE` file is present. The backend package metadata says `ISC`, but that metadata does not provide license text for the repository and conflicts with the missing project-level declaration. Dependency licenses apply to those dependencies, not automatically to this project. Confirm ownership and asset provenance before choosing a project license.
