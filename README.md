# icanhazutc

A dead simple Cloudflare Worker that displays the current UTC time.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Wrangler (if not already done):
   ```bash
   npx wrangler login
   ```

## Development

Run the worker locally:
```bash
npm run dev
```

## Deployment

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

Or use the build script:
```bash
./build.sh
```

## Project Structure

- `src/worker.js` - The main Cloudflare Worker script
- `wrangler.toml` - Wrangler configuration
- `package.json` - Node.js dependencies and scripts
